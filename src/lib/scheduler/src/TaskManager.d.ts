import { CronTask } from "./CronTask";
export declare class TaskManager {
    private taskList;
    constructor(taskList?: CronTask[]);
    schedule(task: ITask): ITask;
    private startTask;
    start(): void;
    reset(): void;
}
