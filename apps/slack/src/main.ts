import { App, LogLevel } from '@slack/bolt';
import { appHomeOpened } from './app/events';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG,
  port: +process.env.SLACK_PORT || 3000,
  socketMode: true,
  appToken:
    'xapp-1-A02CPE3B6RK-2740705807857-6cd47f4ed532bdf0c7de983be153683a60f19b2c9a089658e1e7099a1e5977fa',
});

app.event('app_home_opened', appHomeOpened);
app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`Hey there>!`);
});

(async () => {
  // Start your app
  await app.start();

  console.log(
    await app.client.conversations.list({
      types: 'private_channel',
    })
  );

  console.log('⚡️ Bolt app is running!');
})();
