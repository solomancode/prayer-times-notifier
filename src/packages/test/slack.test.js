#!/usr/bin/env node

const SlackChatMessage = require("../../lib/targets/src/index").SlackChatMessage;

function test() {
    const message = new SlackChatMessage(/** TOKEN */)
    
    message.send({
        text: 'mock test',
        channel: '#cron'
    })
}

test()

module.exports = test;