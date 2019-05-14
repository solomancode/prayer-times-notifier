import { Task } from './Task';
export declare class CronTask extends Task {
    task: ITask;
    private cron;
    private callbackQueue;
    constructor(task: ITask);
    private processTaskParams;
    private createCronJob;
    private skipNewCronJob;
    start(name: string): void;
    private startCronJob;
    private skipCronJobStart;
    stop(): void;
}
