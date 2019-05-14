import adhan from "adhan";
import { TaskManager } from "../../scheduler/src";
import { logger } from '../../common/src/logger';
import { NotificationManager } from '../../targets/src/Notification/NotificationManager';

export default class PrayerTimesNotifier {

  private timeoutId: NodeJS.Timeout;
  private taskManager: TaskManager;
  private notificationManager: NotificationManager;

  constructor(private config: IConfig) {
    this.taskManager = new TaskManager()
    this.notificationManager = new NotificationManager(config.targets)
  }

  @logger({ count: 'updateCount' })
  public updateTodayPrayerTimes() {
    let coordinates = new adhan.Coordinates(...this.config.location);
    let params = adhan.CalculationMethod[this.config.calcMethod]();
    params.madhab = adhan.Madhab[this.config.madhab];
    let prayerTimes = new adhan.PrayerTimes(coordinates, new Date(), params);
    ;['fajr', 'dhuhr','asr','maghrib','isha'] .forEach(name => {
      const time = prayerTimes[name];
      this.attemptToSetPrayerTime(name, time)
    })
    this.schedulePrayerTimes()
  }

  private attemptToSetPrayerTime(name:string, prayerTime: Date) {
    if (!prayerTime) {
      console.error(
        "\n"
        + "× Invalid configurations prayer times\n\n"
        + ". check 'notifier-config.json' then run:\n"
        + ". prayer-times-notifier ./notifier.config.json\n"
        , 'Invalid Time Value');
        process.exit(1)
      }
      if (name in this.config.prayers) {
        this.config.prayers[name].prayerTime = prayerTime
      }
    }

  private schedulePrayerTimes() {
    this.taskManager.reset()
    for (let name in this.config.prayers) {
      if (this.config.prayers.hasOwnProperty(name)) {
        const prayer = this.config.prayers[name];
        if (name === 'jumuah' && (new Date().getDate() !== 5)) continue;
        if (prayer.prayerTime !== 'NOT_SET') {
          const task = {
            name,
            time: prayer.prayerTime,
            utcOffset: this.config.utcOffset,
            callback: () => {
              this.notificationManager.notify(name, this.config)
            }
          }
          this.taskManager.schedule(task)
        }
      }
    }
    this.taskManager.start()
  }

  @logger()
  private startUpdateCycle() {
    const timeout = (60 / this.config.refreshRate) * 60 * 1000
    this.timeoutId = setInterval( () => {
      // TODO: Guard against dropped notifications on update.
      this.updateTodayPrayerTimes()
    }, timeout )
  }

  @logger({ hint: 'Prayer Times Notifier' })
  public start() {
    this.updateTodayPrayerTimes()
    if (this.config.refreshRate) this.startUpdateCycle()
  }

}