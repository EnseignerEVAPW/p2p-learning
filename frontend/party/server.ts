import type * as Party from 'partykit/server';
export default class WebSocketServer implements Party.Server {
    constructor(readonly room: Party.Room) { }
    onMessage(message: string, sender: Party.Connection) {
        // send the message to all connected clients
        for (const conn of this.room.getConnections()) {
            if (conn.id !== sender.id) {
                conn.send(`${sender.id} says: ${message}`);
            }
        }
    }
}
