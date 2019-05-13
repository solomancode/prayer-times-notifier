"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Task {
    constructor(description) {
        this.id = Symbol(description);
        this.status = 'ready';
    }
    setStatus(status) {
        this.status = status;
    }
}
exports.Task = Task;
