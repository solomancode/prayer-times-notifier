"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
class HttpNotifier {
    constructor(host) {
        this.host = host;
        this.headers = {
            'Content-Type': 'application/json'
        };
        this.post = (url, body) => {
            return node_fetch_1.default(this.host + url, { method: 'post', body: JSON.stringify(body), headers: this.headers });
        };
    }
    setHeader(key, value) {
        this.headers[key] = value;
    }
}
exports.HttpNotifier = HttpNotifier;
