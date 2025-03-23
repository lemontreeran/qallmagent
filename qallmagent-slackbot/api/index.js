const { App, ExpressReceiver } = require('@slack/bolt');

const receiver = new ExpressReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    receiver,
});

app.command('/ping', async ({ ack, say }) => {
    console.log('✅ /ping received from Slack');
    await ack();
    await say('Pong!');
});

module.exports = receiver.app;
