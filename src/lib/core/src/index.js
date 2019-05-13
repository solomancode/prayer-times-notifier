"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adhan_1 = __importDefault(require("adhan"));
const src_1 = require("../../scheduler/src");
const logger_1 = require("../../common/src/logger");
const NotificationManager_1 = require("../../targets/src/Notification/NotificationManager");
class PrayerTimesNotifier {
    constructor(config) {
        this.config = config;
        this.taskManager = new src_1.TaskManager();
        this.notificationManager = new NotificationManager_1.NotificationManager(config.targets);
    }
    updateTodayPrayerTimes() {
        let coordinates = new adhan_1.default.Coordinates(...this.config.location);
        let params = adhan_1.default.CalculationMethod[this.config.calcMethod]();
        params.madhab = adhan_1.default.Madhab[this.config.madhab];
        let prayerTimes = new adhan_1.default.PrayerTimes(coordinates, new Date(), params);
        ;
        ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].forEach(name => {
            const time = prayerTimes[name];
            this.attemptToSetPrayerTime(name, time);
        });
        this.schedulePrayerTimes();
    }
    attemptToSetPrayerTime(name, prayerTime) {
        if (!prayerTime) {
            console.error("\n"
                + "× Invalid configurations prayer times\n\n"
                + ". check 'notifier-config.json' then run:\n"
                + ". prayer-times-notifier ./notifier.config.json\n", 'Invalid Time Value');
            process.exit(1);
        }
        if (name in this.config.prayers) {
            this.config.prayers[name].prayerTime = prayerTime;
        }
    }
    schedulePrayerTimes() {
        this.taskManager.reset();
        for (let name in this.config.prayers) {
            if (this.config.prayers.hasOwnProperty(name)) {
                const prayer = this.config.prayers[name];
                if (name === 'jumuah' && (new Date().getDate() !== 5))
                    continue;
                if (prayer.prayerTime !== 'NOT_SET') {
                    this.taskManager.schedule(prayer.prayerTime, () => {
                        this.notificationManager.notify(name, this.config);
                    }, name);
                }
            }
        }
        this.taskManager.start();
    }
    startUpdateCycle() {
        const timeout = (60 / this.config.refreshRate) * 60 * 1000;
        this.timeoutId = setInterval(() => {
            // TODO: Guard against dropped notifications on update.
            this.updateTodayPrayerTimes();
        }, timeout);
    }
    start() {
        this.updateTodayPrayerTimes();
        if (this.config.refreshRate)
            this.startUpdateCycle();
    }
}
__decorate([
    logger_1.logger({ count: 'updateCount' })
], PrayerTimesNotifier.prototype, "updateTodayPrayerTimes", null);
__decorate([
    logger_1.logger()
], PrayerTimesNotifier.prototype, "startUpdateCycle", null);
__decorate([
    logger_1.logger({ hint: 'Prayer Times Notifier' })
], PrayerTimesNotifier.prototype, "start", null);
exports.default = PrayerTimesNotifier;
