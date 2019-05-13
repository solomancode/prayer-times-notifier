import { SlackChatMessage } from '../slack/SlackChatMessage';
import { logger } from '../../../common/src';

export class NotificationManager {
  private registeredTargets: INotificationTarget[];

  constructor(targets: INotificationTarget[] = []) {
    this.registeredTargets = targets
  }

  private targets: { [key in NotificationTarget]: Function } = {
    
    'slack': (options: ISlackMessageOptions, prayerConfig: IPrayerConfig) => {
      const message = new SlackChatMessage(options.token)
      if (prayerConfig.hasOwnProperty('prayerCall')) {
        options.text = prayerConfig.prayerCall
      }
      message.send(options)
    },

    'facebook': () => {
      console.log('target facebook is not yet supported')
    }
    
  }
  
  @logger({ params: [0] })
  notifyTarget(targetName: NotificationTarget, contextOptions: any = {}) {
    this.registeredTargets.forEach(target => {
      if (target.name === targetName) {
        this.targets[target.name](target.options, contextOptions)
      }
    })
  }
  
  notify(name: string, config: IConfig) {
    this.registeredTargets.forEach(target => {
      this.targets[target.name](target.options, config.prayers[name])
    })
  }

}