const { App, ExpressReceiver } = require('@slack/bolt');

// Load tokens from environment
const signingSecret = process.env.SLACK_SIGNING_SECRET;
const botToken = process.env.SLACK_BOT_TOKEN;

console.log('🔐 SLACK_BOT_TOKEN:', botToken );
console.log('🔐 SLACK_SIGNING_SECRET:', signingSecret );

// Create ExpressReceiver
const receiver = new ExpressReceiver({
    signingSecret,
    processBeforeResponse: true
});

// Create the Bolt app
const app = new App({
    token: botToken,
    receiver,
    logLevel: LogLevel.DEBUG
});

// Register slash command
app.command('/ping', async ({ ack, say }) => {
    console.log('✅ /ping triggered');
    await ack();
    await say('🏓 Pong from Vercel!');
});

// ❌ DO NOT call app.init()

// Export the Express app to Vercel
module.exports = receiver.app;
