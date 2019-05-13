import { CronTask } from "./CronTask";
export declare class TaskManager {
    private taskList;
    constructor(taskList?: CronTask[]);
    schedule(time: Date, callback: () => void, description?: string): CronTask;
    private startTask;
    start(): void;
    reset(): void;
}
