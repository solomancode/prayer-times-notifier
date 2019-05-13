import { HttpNotifier } from "../http";
import { logger } from "../../../common/src";

export class SlackChatMessage extends HttpNotifier {

  constructor(private token: string){
    super('https://slack.com/api')
  }

  @logger({ count: 'send' })
  public send(message: ISlackMessageOptions) {
    this.setHeader('Authorization', 'Bearer ' + this.token )
    this.post('/chat.postMessage', message)
  }

}