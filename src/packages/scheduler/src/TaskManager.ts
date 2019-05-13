import { CronTask } from "./CronTask";
import { logger } from "../../../lib/common/src";

export class TaskManager {
  private taskList: CronTask[];

  constructor(taskList: CronTask[] = []) {
    this.taskList = taskList
  }

  public schedule(time: Date, callback: () => void, description: string = '') {
    const task = new CronTask(time, callback, description)
    this.taskList.push(task)
    return task;
  }

  private startTask(task: CronTask) {
    task.start(task.description)
  }

  public start() {
    this.taskList.forEach(this.startTask)
  }

  @logger({ hint: 'Reset Task Manager'})
  reset() {
    this.taskList.forEach(task => task.stop())
    this.taskList = []
  }
}