export abstract class Task {

  public id: Symbol;
  public status: TaskStatus;

  constructor(description?: string) {
    this.id = Symbol(description)
    this.status = 'ready'
  }

  setStatus(status: TaskStatus) {
    this.status = status
  }

}