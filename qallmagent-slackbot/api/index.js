const { App, ExpressReceiver } = require('@slack/bolt');

const expressReceiver = new ExpressReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    receiver: expressReceiver
});

app.command('/ping', async ({ ack, say }) => {
    console.log('/ping received from Slack');
    await ack();
    console.log('ack() complete');
    await say('Pong!');
});

expressReceiver.app.use((req, res, next) => {
    console.log("🔥 Received unknown route", req.method, req.url);
    next();
});

module.exports = expressReceiver.app;
