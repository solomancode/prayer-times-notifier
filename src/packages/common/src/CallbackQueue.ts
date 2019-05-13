export class CallbackQueue {
  
  private queue: IQueueItem[];
  
  constructor(callbackQueue: Function[] = []) {
    const status: enqueued = 0;
    this.queue = callbackQueue.map(cb => ({
      fn: cb, status
    }))
  }

  push(callback: Function) {
    const status: enqueued = 0;
    this.queue.push({
      fn: callback, status
    })
  }

  pop(item) {
    item.fn()
    item.status = 1
  }
  
  exec = () => {
    this.queue.forEach(item => this.pop(item))
  }
  
}