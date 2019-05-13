export declare class CallbackQueue {
    private queue;
    constructor(callbackQueue?: Function[]);
    push(callback: Function): void;
    pop(item: any): void;
    exec: () => void;
}
