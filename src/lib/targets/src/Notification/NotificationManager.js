"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const SlackChatMessage_1 = require("../slack/SlackChatMessage");
const src_1 = require("../../../common/src");
class NotificationManager {
    constructor(targets = []) {
        this.targets = {
            'slack': (options, prayerConfig) => {
                const message = new SlackChatMessage_1.SlackChatMessage(options.token);
                if (prayerConfig.hasOwnProperty('prayerCall')) {
                    options.text = prayerConfig.prayerCall;
                }
                message.send(options);
            },
            'facebook': () => {
                console.log('target facebook is not yet supported');
            }
        };
        this.registeredTargets = targets;
    }
    notifyTarget(targetName, contextOptions = {}) {
        this.registeredTargets.forEach(target => {
            if (target.name === targetName) {
                this.targets[target.name](target.options, contextOptions);
            }
        });
    }
    notify(name, config) {
        this.registeredTargets.forEach(target => {
            this.targets[target.name](target.options, config.prayers[name]);
        });
    }
}
__decorate([
    src_1.logger({ params: [0] })
], NotificationManager.prototype, "notifyTarget", null);
exports.NotificationManager = NotificationManager;
