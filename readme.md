# Slack Block Party

A Node app that whitelists users that can post in a particular Slack channel. If an unauthorized user tries to post...

  1. Their message is immediately deleted
  2. They are pinged via `slackbot` with a notification

In essence, **Slack Block Party** can be used to make a public channel read-only.

> At the time of writing this, Slack only natively allows you whitelist the #announcements channel.

### Setup

```bash
$ git clone xxx
$ npm install
$ nodemon
```

### `env.js`

This tool requires an `env.js` in the root directory with the following contents...

```js
module.exports = {
  slackBotToken: "bot-token-goes-here",
  webToken: "user-token-goes-here",
  monitoredChannels: [
    "channel-id-goes-here"
  ],
  validUsers: [
    "user-id-goes-here"
  ]
}
```