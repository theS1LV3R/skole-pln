import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  ConnectedSocket,
} from '@nestjs/websockets';
import { WsAdapter } from '@nestjs/platform-ws';
import { WebSocket, Server } from 'ws';

import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Logger } from '@nestjs/common';
import { from, map } from 'rxjs';
import { JoinLeaveRoomDto } from './dto/join-leave-room.dto';
import { IncomingMessage } from 'http';

@WebSocketGateway(8080, { adapter: WsAdapter })
export class EventsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(private readonly eventsService: EventsService) {}

  private readonly logger: Logger = new Logger(EventsService.name);

  afterInit(server: Server) {
    // console.log(server);
    const a = server.address();

    if (typeof a === 'string') {
      this.logger.log(`Initialized websocket gateway at ${a}`);
    }

    if (typeof a === 'object') {
      this.logger.log(
        `Initialized websocket gateway at ${a.address}:${a.port}`,
      );
    }
  }

  handleConnection(client: WebSocket, req: IncomingMessage, ...args: any[]) {
    this.eventsService.addClient(client);

    const remoteAddress =
      req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    this.logger.log(`Client connected: ${remoteAddress}`);
  }

  handleDisconnect(client: WebSocket) {
    this.eventsService.removeClient(client);
    // @ts-expect-error There is a property here but its not typed
    this.logger.log(`Client disconnected: ${client._socket.remoteAddress}`);
  }

  @SubscribeMessage('events')
  async onEvent(
    @MessageBody() createEventDto: CreateEventDto,
  ): Promise<CreateEventDto> {
    return from([...Array(10).keys()]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage('join_room')
  async handleJoinRoom(
    @MessageBody() joinRoomDto: JoinLeaveRoomDto,
    @ConnectedSocket() client: WebSocket,
  ) {
    return this.eventsService.joinRoom(joinRoomDto.room, client);
  }

  @SubscribeMessage('leave_room')
  async handleLeaveRoom(
    @MessageBody() leaveRoomDto: JoinLeaveRoomDto,
    @ConnectedSocket() client: WebSocket,
  ) {
    return this.eventsService.leaveRoom(leaveRoomDto.room, client);
  }
}
