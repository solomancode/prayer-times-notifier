const enableLogging = true;
const counterMap = {}
const logOnly = []

function count(id: string) {
  if(id in counterMap) {
    counterMap[id]++;
  } else {
    counterMap[id] = 1
  }
  return counterMap[id]
}

function formatDate(date: Date) {
  return date instanceof Date ? date.toUTCString() : date
}

function formatLine(log: string, type: LogType = 'default') {
  if (!log) return '';
  let line: string;
  switch (type) {
    case 'info':
      line = `# ${log}`
      break;
    case 'fail':
      line = `(!) ${log}`
      break;
    case 'success':
      line = `✓ ${log}`
      break;
    case 'counter':
      line = `↻ ${log}`
      break;
    case 'param':
      line = `@ ${log}`
      break;
    default:
      line = log
      break;
  }
  return line + '\n';
}

function log(message: string, meta: ILoggerMeta, paramsData: string[] = []) {
  const c = meta.count ? count(meta.count) : null; 
  const fromattedData = paramsData.length ? paramsData.map(param => formatLine(param, 'param')).join('') : '';
  enableLogging && console.log(
    formatLine(formatDate(new Date())) +
    formatLine(message, 'info') +
    formatLine(meta.hint, 'info') +
    formatLine(c, 'counter') +
    fromattedData
  )
}

function extractParams(params: any, targetParams: any): string[] {
  return targetParams ? targetParams.map((param: string|number) => {
    let value = typeof param === 'string' ? params[0][param] : params[param]
    value = formatDate(value)
    return `${param}: ${value}`
  }) : []
}

export function logger(meta: ILoggerMeta = {}) {
  return (target: Object, propertyName: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    if (meta.only) logOnly.push(propertyName)
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const willLog = logOnly.length ? logOnly.includes(propertyName) : true;
      willLog && log(propertyName+'()', meta, extractParams(args, meta.params) )
      return original.apply(this, args)
    }
    return descriptor
  }
}