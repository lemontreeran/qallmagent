const { App, ExpressReceiver } = require('@slack/bolt');

// ✅ Load secrets
const signingSecret = process.env.SLACK_SIGNING_SECRET;
const botToken = process.env.SLACK_BOT_TOKEN;

// ✅ Create ExpressReceiver
const receiver = new ExpressReceiver({
    signingSecret,
});

// ✅ Create Bolt App
const app = new App({
    token: botToken,
    receiver,
});

// ✅ Register /ping command
app.command('/ping', async ({ ack, say }) => {
    console.log("✅ /ping triggered");
    await ack();
    await say("🏓 Pong from Vercel!");
});

// ✅ Initialize Bolt app if token is available
(async () => {
    if (!botToken) {
        console.error("❌ SLACK_BOT_TOKEN is missing!");
    } else {
        await app.init();
        console.log("✅ Bolt app initialized");
    }
})();

// ✅ Export for Vercel
module.exports = receiver.app;
