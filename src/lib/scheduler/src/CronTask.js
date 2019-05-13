"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Task_1 = require("./Task");
const cron_1 = require("cron");
const src_1 = require("../../common/src");
const moment_1 = __importDefault(require("moment"));
class CronTask extends Task_1.Task {
    constructor(time, callback, description) {
        super(description);
        this.time = time;
        this.description = description;
        this.callbackQueue = new src_1.CallbackQueue([callback]);
        this.cron = null;
        this.processCronParams({ cronTime: time, description });
    }
    processCronParams({ cronTime, description }) {
        const now = moment_1.default();
        const diff = moment_1.default(cronTime).diff(now, 'seconds');
        try {
            this.createCronJob(cronTime, description);
        }
        catch (error) {
            this.skipNewCronJob(cronTime, error);
        }
    }
    createCronJob(cronTime, description) {
        const cronParams = {
            cronTime,
            onTick: this.callbackQueue.exec
        };
        this.cron = new cron_1.CronJob(cronParams);
    }
    skipNewCronJob(cronTime, description) { }
    start(description) {
        this.cron
            ? this.startCronJob(description)
            : this.skipCronJobStart(description);
    }
    startCronJob(description) {
        try {
            this.cron.start();
            this.setStatus('started');
        }
        catch (error) {
            this.skipCronJobStart(error);
        }
    }
    skipCronJobStart(description) { }
    stop() {
        this.cron && this.cron.stop();
        this.setStatus('stopped');
    }
}
__decorate([
    src_1.logger({ params: [0, 1] })
], CronTask.prototype, "createCronJob", null);
__decorate([
    src_1.logger({ params: [1] })
], CronTask.prototype, "skipNewCronJob", null);
__decorate([
    src_1.logger({ params: [0] })
], CronTask.prototype, "startCronJob", null);
__decorate([
    src_1.logger({ params: [0] })
], CronTask.prototype, "skipCronJobStart", null);
__decorate([
    src_1.logger({ hint: 'Cron Task' })
], CronTask.prototype, "stop", null);
exports.CronTask = CronTask;
