export default class PrayerTimesNotifier {
    private config;
    private timeoutId;
    private taskManager;
    private notificationManager;
    constructor(config: IConfig);
    updateTodayPrayerTimes(): void;
    private attemptToSetPrayerTime;
    private schedulePrayerTimes;
    private startUpdateCycle;
    start(): void;
}
