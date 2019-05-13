import { Task } from './Task';
import { CronJob, CronJobParameters } from 'cron';
import { CallbackQueue, logger } from '../../common/src';
import moment from 'moment';

export class CronTask extends Task {
  private cron: CronJob | null;
  private callbackQueue: CallbackQueue;
  
  constructor(private time: Date, callback: Function, public description?: string) {
    super(description)
    this.callbackQueue = new CallbackQueue([callback])
    this.cron = null;
    this.processCronParams({ cronTime: time, description })
  }

  private processCronParams({ cronTime, description }: { cronTime: Date; description: string; }) {
    const now = moment()
    const diff = moment(cronTime).diff(now, 'seconds')
    try {
      this.createCronJob(cronTime, description)
    } catch (error) {
      this.skipNewCronJob(cronTime, error)
    }
  }

  @logger({params: [0,1]})
  private createCronJob(cronTime: Date, description: string) {
    const cronParams: CronJobParameters = {
      cronTime,
      onTick  : this.callbackQueue.exec
    }
    this.cron = new CronJob(cronParams)
  }

  @logger({params: [1]})
  private skipNewCronJob(cronTime: Date, description: string) {}

  public start(description: string) {
    this.cron
    ? this.startCronJob(description)
    : this.skipCronJobStart(description)
  }
  
  @logger({ params: [0] })
  private startCronJob(description: string) {
    try {
      this.cron.start()
      this.setStatus('started')
    } catch (error) {
      this.skipCronJobStart(error)      
    }
  }

  @logger({ params: [0] })
  private skipCronJobStart(description: string) {}
  
  @logger({ hint: 'Cron Task' })
  public stop() {
    this.cron && this.cron.stop()
    this.setStatus('stopped')
  }
}