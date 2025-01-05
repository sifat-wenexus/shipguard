import { addRequestHandler } from '~/modules/websocket/websocket.server';

addRequestHandler('end', async (msg, ws) => {
  const { id, type } = msg.payload.payload;
  const ctx = ws.getUserData();

  if (type === 'message') {
    const message = ctx.messages.get(id);

    if (message) {
      message.disposed = true;
      message.emit('end');
    }
  } else {
    ctx.replies.get(id)?.emit('end');
  }

  msg.reply(true);
});
