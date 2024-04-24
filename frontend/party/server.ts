// tldraw-sockets-example - Implementa tldraw con partykit-websockets
// Copyright (C) 2024 David Sheldrick y Steve Ruiz

// Este programa es software libre: puedes redistribuirlo y/o modificarlo
// bajo los términos de la GNU General Public License como es publicado por
// la Free Software Foundation, ya sea la versión 3 de la Licencia, o
// (a tu elección) cualquier versión posterior.

// Este programa se distribuye con la esperanza de que sea útil,
// pero SIN NINGUNA GARANTÍA; sin incluso la garantía implícita de
// COMERCIABILIDAD o APTITUD PARA UN PROPÓSITO PARTICULAR. Vea la
// GNU General Public License para más detalles.

import type * as Party from 'partykit/server';
import {  HistoryEntry,  TLRecord,  TLStoreSnapshot, createTLSchema, throttle } from 'tldraw';
import { snapshot } from 'yjs';

export default class WebSocketServer implements Party.Server {
  records: Record<string, TLRecord> = {}

  readonly initResult: Promise<void>
  constructor(public party: Party.Party) {
    this.initResult = (async () => {
      const snapshot = (await this.party.storage.get(
        'snapshot',
      )) as TLStoreSnapshot
      if (!snapshot) {
        return
      }
      const migrationResult = this.schema.migrateStoreSnapshot(snapshot)
      if (migrationResult.type === 'error') {
        throw new Error(migrationResult.reason)
      }

      this.records = migrationResult.value
    })()
  }
  readonly schema = createTLSchema()

  persist = throttle(async () => {
    this.party.storage.put('snapshot', {
      store: this.records,
      schema: this.schema.serialize(),
    })
  }, 1000)

  async onConnect(connection: Party.Connection<unknown>) {
    await this.initResult
    connection.send(
      JSON.stringify({
        type: 'init',
        snapshot: {store: this.records, schema: this.schema.serialize()},
      })
    )
  }

  onMessage(message: string, sender: Party.Connection<unknown>): void | Promise<void> {
    const message2 = JSON.parse(message as string)
    const schema = createTLSchema().serialize()
    switch(message2.type){
      case 'update': {
        try {
          for(const update of message2.updates){
            const { 
              changes: {added, updated, removed},
            } = update as HistoryEntry<TLRecord>

            for(const record of Object.values(added)){
              this.records[record.id] = record
            }
            for(const [, to] of Object.values(updated)){
              this.records[to.id] = to
            }
            for(const record of Object.values(removed)){
              delete this.records[record.id]
            }
          }
          //aca recien se hace broadcast
          this.party.broadcast(message, [sender.id])
          this.persist()
        }catch(e){
          sender.send(
            JSON.stringify({
              type: 'recovery',
              snapshot: { store: this.records, schema },
            })
          )
        }
        break
      }
      case 'recovery':{
        const schema = createTLSchema().serialize()
        sender.send(
          JSON.stringify({
            type: 'recovery',
            snapshot:{ store: this.records, schema},
          })
        )
        break
      }
    }
  }


  /*constructor(readonly room: Party.Room) { }
  onMessage(message: string, sender: Party.Connection) {
      // send the message to all connected clients
      for (const conn of this.room.getConnections()) {
          if (conn.id !== sender.id) {
              conn.send(`${sender.id} says: ${message}`);
          }
      }
  }*/
}

