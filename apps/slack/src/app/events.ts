import { Middleware, SlackEventMiddlewareArgs } from '@slack/bolt';

type SlackEvent<EventType extends string = string> = Middleware<
  SlackEventMiddlewareArgs<EventType>
>;

export const appHomeOpened: SlackEvent = async ({ event, say }) => {
  await say('elo');
};
