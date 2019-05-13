#!/usr/bin/env node

const moment = require("moment");

function test(callback) {
    
    const CronTask = require("../../lib/scheduler/src/index").CronTask;
    
    const nextMinute = moment().add(1, 'minute').toDate();
    
    console.log( nextMinute )
    
    const cron = new CronTask(nextMinute, () => {
        console.log('cron fired')
        callback && callback()
    })
    
    cron.start('test cron')
}

test()

module.exports = test