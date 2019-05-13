export declare abstract class Task {
    id: Symbol;
    status: TaskStatus;
    constructor(description?: string);
    setStatus(status: TaskStatus): void;
}
