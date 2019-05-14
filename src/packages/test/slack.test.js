#!/usr/bin/env node

const SlackChatMessage = require("../../lib/targets/src/index").SlackChatMessage;


function test(slackToken) {
    console.log({slackToken})
    const message = new SlackChatMessage(slackToken)
    
    message.send({
        text: Math.random() * 1000,
        channel: '#cron'
    })
}

const [,, args] = process.argv
const [slackToken] = args ? args.split(',') : []
slackToken && test(slackToken)

module.exports = test;