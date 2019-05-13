#!/usr/bin/env node

const slackMessageTest = require("./slack.test")
const cronTest = require("./cron.test")

cronTest(slackMessageTest)