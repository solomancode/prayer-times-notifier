type NOT_SET = 'NOT_SET'

type TaskStatus =
  'ready'
| 'started'
| 'stopped'

type Prayer =
  'fajr'        
| 'dhuhr'      
| 'asr'          
| 'maghrib'  
| 'isha'
| 'jumuah'

type Latitude  = number
type Longitude = number

type coordinates = [Latitude, Longitude]

interface IPrayerConfig {
    name         : Prayer
    prayerCall   : string
    prayerTime?  : Date | NOT_SET
}

type CalculationMethod =
  'MuslimWorldLeague'
| 'Egyptian'
| 'Karachi'
| 'UmmAlQura'
| 'Dubai'
| 'Qatar'
| 'Kuwait'
| 'MoonsightingCommittee'
| 'NorthAmerica'
| 'Other'

type Madhab =
  'Shafi'
| 'Hanafi'

interface IConfig {
    country     : string | NOT_SET
    city        : string | NOT_SET
    location    : coordinates
    madhab      : Madhab
    utcOffset   : string
    refreshRate : number,
    calcMethod  : CalculationMethod
    targets?    : INotificationTarget[]
    prayers     : {
        [P in Prayer]: IPrayerConfig
    }
}

interface ITask {
  time           : Date
  callback       : () => void
  name           ?: string
  utcOffset      ?: string
  description    ?: string
}

type enqueued = 0;
type dequeued = 1;

interface IQueueItem {
  fn      : Function,
  status  : enqueued | dequeued
}

interface ISlackMessageOptions {
  text?         : string
  channel       : string
  token?        : string
  as_user?      : string
  icon_emoji?   : string
  icon_url?     : string
  username?     : string
  link_names    : boolean
}

type NotificationTarget =
  'slack'
| 'facebook'

interface INotificationTarget {
  name   : NotificationTarget
  options: ISlackMessageOptions
}

type LogType =
  'default'
| 'info'
| 'fail'
| 'success'
| 'counter'
| 'param'

type LoggerParams = string[] | number[]

interface ILoggerMeta {
  only      ?: boolean
  type      ?: LogType
  hint      ?: string
  count     ?: string
  params    ?: LoggerParams
}

declare module "adhan"
declare module "twelve-to-twentyfour"