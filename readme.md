# Slack Block Party

A Node app that whitelists users that can post in a particular Slack channel. If an unauthorized user tries to post...

  1. Their message is immediately deleted
  2. They are pinged via `slackbot` with a notification

In essence, **Slack Block Party** can be used to make a public channel read-only.

> At the time of writing this, Slack only natively allows you whitelist the #announcements channel.

### Setup

```bash
$ git clone git@github.com:amaseda/slack-block-party.git
$ npm install
$ nodemon
```

### `env.js`

This tool requires an `env.js` in the root directory with the following contents...

```js
module.exports = {
  slackBotToken: "bot-token-goes-here",
  webToken: "user-token-goes-here",
  channelsAndUsers: {
    "channel-id-goes-here": [
      "user-id-goes-here"
    ],
    "can-have-multiple-channels": [
      "can-also-have",
      "multiple-users"
    ]
  }
}
```

> The user token must belong to an owner of the Slack team(s) in question.
