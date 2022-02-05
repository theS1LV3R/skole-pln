import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class EventsService {
  private clients: Socket[] = [];
  private logger: Logger = new Logger(EventsService.name);

  async addClient(client: Socket) {
    this.clients.push(client);
    this.logger.log(`Client connected: ${client.id}`);
  }

  async removeClient(client: Socket) {
    this.clients = this.clients.filter((c) => c !== client);
  }

  async emit(event: string, data: any) {
    this.clients.forEach((client) => {
      client.emit(event, data);
    });
  }
}
