import bolt from '@slack/bolt';
import serverlessExpress from 'serverless-http';
import express from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Pull Bolt exports manually
const { App, ExpressReceiver } = bolt;

// Create raw express
const app = express();

// Create ExpressReceiver
const expressReceiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  processBeforeResponse: true,
  app,
});

// Create Slack Bolt app
const boltApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: expressReceiver,
});

// Slash command
boltApp.command('/pingbot', async ({ ack, respond }) => {
  console.log('✅ /pingbot command received');
  await ack();
  await respond('🏓 Pong from openqnabot on Lambda!');
});

// Export using serverless-http
export const handler = serverlessExpress(expressReceiver.app, {
  request: (req, event) => {
    if (event.isBase64Encoded) {
      const body = Buffer.from(event.body, 'base64').toString();
      req.body = new URLSearchParams(body);
    } else if (typeof event.body === 'string') {
      req.body = new URLSearchParams(event.body);
    } else {
      req.body = event.body;
    }
    req.headers = event.headers;
    req.method = event.requestContext.http.method;
    req.url = event.rawPath;
    req.rawBody = event.body;
    return req;
  }
});
