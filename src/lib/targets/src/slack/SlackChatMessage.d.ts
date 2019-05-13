import { HttpNotifier } from "../http";
export declare class SlackChatMessage extends HttpNotifier {
    private token;
    constructor(token: string);
    send(message: ISlackMessageOptions): void;
}
