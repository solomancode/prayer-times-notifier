"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("../http");
const src_1 = require("../../../common/src");
class SlackChatMessage extends http_1.HttpNotifier {
    constructor(token) {
        super('https://slack.com/api');
        this.token = token;
    }
    send(message) {
        this.setHeader('Authorization', 'Bearer ' + this.token);
        this.post('/chat.postMessage', message);
    }
}
__decorate([
    src_1.logger({ count: 'send' })
], SlackChatMessage.prototype, "send", null);
exports.SlackChatMessage = SlackChatMessage;
