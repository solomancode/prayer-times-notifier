import { Task } from './Task';
import { CronJob, CronJobParameters } from 'cron';
import { CallbackQueue, logger } from '../../common/src';
import moment from 'moment';

export class CronTask extends Task {
  private cron: CronJob | null;
  private callbackQueue: CallbackQueue;
  
  constructor(public task: ITask) {
    super(task.description)
    this.callbackQueue = new CallbackQueue([task.callback])
    this.cron = null;
    this.processTaskParams(task)
  }

  private processTaskParams(task: ITask) {
    const now = moment()
    const diff = moment(task.time).diff(now, 'seconds')
    try {
      this.createCronJob(task)
    } catch (error) {
      this.skipNewCronJob( task, error )
    }
  }

  @logger({params: ['name', 'time', 'utcOffset']})
  private createCronJob({ name, time, utcOffset = '0' }: ITask) {
    const cronParams: CronJobParameters = {
      cronTime: time,
      utcOffset,
      onTick  : this.callbackQueue.exec
    }
    this.cron = new CronJob(cronParams)
  }

  @logger({params: ['name', 'time', 'utcOffset']})
  private skipNewCronJob(task: ITask, error: any) {}

  public start(name: string) {
    this.startCronJob(name, this.task.time, this.task.utcOffset)
  }
  
  @logger({ params: [0, 1, 2] })
  private startCronJob(name: string, time: Date, utcOffset: string) {
    try {
      this.cron.start()
      this.setStatus('started')
    } catch (error) {
      this.skipCronJobStart(error, name)      
    }
  }

  @logger({params: [0, 1]})
  private skipCronJobStart(error: any, name: string) {}
  
  @logger({ hint: 'Cron Task' })
  public stop() {
    this.cron && this.cron.stop()
    this.setStatus('stopped')
  }
}