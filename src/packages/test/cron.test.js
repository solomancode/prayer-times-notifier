#!/usr/bin/env node

const moment = require("moment");

function test(callback) {
    const CronTask = require("../../lib/scheduler/src/index").CronTask;
    
    const nextMinute = moment().add(5, 'seconds').toDate();
    
    const [,, utcOffset] = process.argv

    const task = {
        name           : 'testing',
        time           : nextMinute,
        utcOffset      : utcOffset || '0',
        callback
    }
    
    const cron = new CronTask(task)
    
    cron.start('test cron')
}

test(
    () => console.log('cron fired 瑄')
)

module.exports = test