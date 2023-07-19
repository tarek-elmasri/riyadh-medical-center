import Pusher from "pusher";
import PusherClient from "pusher-js";

declare global {
  var pusherServer: Pusher | undefined;
  var pusherClient: PusherClient | undefined;
}

const newPusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: "ap2",
  useTLS: true,
});

const pusher = globalThis.pusherServer || newPusher;

if (process.env.NODE_ENV !== "production") globalThis.pusherServer = newPusher;

// async () => await pusher.trigger("counters", "list", []);

const newPusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  {
    cluster: "ap2",
  }
);

export const pusherClient = globalThis.pusherClient || newPusherClient;

export default pusher;
