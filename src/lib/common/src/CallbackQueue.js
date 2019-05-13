"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CallbackQueue {
    constructor(callbackQueue = []) {
        this.exec = () => {
            this.queue.forEach(item => this.pop(item));
        };
        const status = 0;
        this.queue = callbackQueue.map(cb => ({
            fn: cb, status
        }));
    }
    push(callback) {
        const status = 0;
        this.queue.push({
            fn: callback, status
        });
    }
    pop(item) {
        item.fn();
        item.status = 1;
    }
}
exports.CallbackQueue = CallbackQueue;
