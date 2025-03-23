const { App, ExpressReceiver } = require('@slack/bolt');

// Initialize ExpressReceiver
const expressReceiver = new ExpressReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Initialize Bolt app
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    receiver: expressReceiver,
});

// ✅ Register /ping slash command
app.command('/ping', async ({ ack, say }) => {
    console.log("⚡ Received /ping");
    await ack();
    await say("🏓 Pong from Vercel!");
});

// 🧪 Debug: Log unmatched routes
expressReceiver.app.use((req, res, next) => {
    console.log("🔥 Received unknown route", req.method, req.url);
    next();
});

(async () => {
    if (!botToken) {
        console.error("❌ SLACK_BOT_TOKEN is missing!");
    } else {
        await app.init();
        console.log("✅ Bolt app initialized");
    }
})();

// ✅ Export for Vercel
module.exports = expressReceiver.app;
