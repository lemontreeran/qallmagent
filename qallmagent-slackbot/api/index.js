const { App, ExpressReceiver } = require('@slack/bolt');

const signingSecret = process.env.SLACK_SIGNING_SECRET;
const botToken = process.env.SLACK_BOT_TOKEN;

console.log('🔐 SLACK_BOT_TOKEN:', botToken ? '✅ defined' : '❌ MISSING');
console.log('🔐 SLACK_SIGNING_SECRET:', signingSecret ? '✅ defined' : '❌ MISSING');

const receiver = new ExpressReceiver({ signingSecret });

const app = new App({
    token: botToken,
    receiver,
});

if (botToken) {
    app.command('/ping', async ({ ack, say }) => {
        console.log('✅ /ping triggered');
        await ack();
        await say('🏓 Pong from Vercel!');
    });

    // Optional: app.init() only if needed
    (async () => {
        await app.init();
        console.log('✅ Bolt app initialized');
    })();
} else {
    console.error('❌ SLACK_BOT_TOKEN is not defined – slash commands will not work');
}

module.exports = receiver.app;
