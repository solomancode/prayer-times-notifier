import { CronTask } from "./CronTask";
import { logger } from "../../../lib/common/src";

export class TaskManager {
  private taskList: CronTask[];

  constructor(taskList: CronTask[] = []) {
    this.taskList = taskList
  }

  public schedule(task: ITask) {
    const cronTask = new CronTask(task)
    this.taskList.push(cronTask)
    return task;
  }

  private startTask(cronTask: CronTask) {
    cronTask.start(cronTask.task.name)
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