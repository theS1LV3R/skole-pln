import { Injectable } from '@nestjs/common';
import { WebSocketServer, WsException } from '@nestjs/websockets';
import { WebSocket, Server } from 'ws';

@Injectable()
export class EventsService {
  private clients: Set<WebSocket> = new Set();

  private rooms: Map<string, WebSocket[]> = new Map();

  @WebSocketServer()
  private server: Server;

  addClient(client: WebSocket) {
    this.clients.add(client);

    client.on('close', () => {
      this.removeClient(client);
    });
  }

  removeClient(client: WebSocket) {
    this.clients.delete(client);
  }

  joinRoom(room: string, client: WebSocket) {
    if (!this.rooms.get(room)) {
      this.rooms.set(room, [client]);
      return;
    }

    this.rooms.set(room, [...this.rooms.get(room), client]);

    return { status: 201, message: 'Joined room' };
  }

  leaveRoom(room: string, client: WebSocket) {
    if (!this.rooms.get(room)) return;

    this.rooms.set(
      room,
      this.rooms.get(room).filter((c) => c !== client),
    );
  }
}
