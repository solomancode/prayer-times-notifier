export declare class NotificationManager {
    private registeredTargets;
    constructor(targets?: INotificationTarget[]);
    private targets;
    notifyTarget(targetName: NotificationTarget, contextOptions?: any): void;
    notify(name: string, config: IConfig): void;
}
