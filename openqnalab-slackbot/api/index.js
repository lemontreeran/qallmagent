const { App, LogLevel, ExpressReceiver } = require('@slack/bolt');
const serverless = require('serverless-http');

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
app.command('/pingbot', async ({ ack, respond }) => {
    console.log('✅ /ping triggered');
    await ack();
    await respond('🏓 Pong from Vercel!');
});

// ❌ DO NOT call app.init()

// Export the Express app to Vercel
module.exports = serverless(receiver.app);
