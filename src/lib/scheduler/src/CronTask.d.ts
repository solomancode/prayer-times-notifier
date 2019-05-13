import { Task } from './Task';
export declare class CronTask extends Task {
    private time;
    description?: string;
    private cron;
    private callbackQueue;
    constructor(time: Date, callback: Function, description?: string);
    private processCronParams;
    private createCronJob;
    private skipNewCronJob;
    start(description: string): void;
    private startCronJob;
    private skipCronJobStart;
    stop(): void;
}
