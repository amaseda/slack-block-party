const RtmClient = require("@slack/client").RtmClient
const WebClient = require('@slack/client').WebClient;
const CLIENT_EVENTS = require("@slack/client").CLIENT_EVENTS
const RTM_EVENTS = require('@slack/client').RTM_EVENTS

const env = require("./env.js")

// Tokens (define in env.js)
const botToken = process.env.SLACK_BOT_TOKEN || env.slackBotToken
const webToken = process.env.WEB_TOKEN || env.webToken

// Initialize Slack clients
const rtm = new RtmClient(botToken)
const webAdmin = new WebClient(webToken)
const webBot = new WebClient(botToken)

// Arrays of monitored Slack channels and whitelisted users (define in env.js)
const monitoredChannels = process.env.MONITORED_CHANNELS || env.monitoredChannels
const validUsers = process.env.VALID_USERS || env.validUsers
const channelsAndUsers = process.env.CHANNELS_AND_USERS || env.channelsAndUsers

rtm.on(RTM_EVENTS.MESSAGE, message => {
  const isMonitoredChannel = Object.keys(channelsAndUsers).includes(message.channel)
  const isNotValidUser = !(channelsAndUsers[message.channel].includes(message.user))

  if(isMonitoredChannel && isNotValidUser){
    webAdmin.chat.delete(message.ts, message.channel)
    webAdmin.users.info(message.user).then(userResponse => {  // Convert user id to name
      webAdmin.channels.info(message.channel).then(channelResponse => {   // Convert channel id to name
        const username = `@${userResponse.user.name}`
        const channel = `#${channelResponse.channel.name}`
        const message = `You do not have permission to post in ${channel}.`
        webBot.chat.postMessage(username, message)
      })
    })
  }
});

rtm.start()
