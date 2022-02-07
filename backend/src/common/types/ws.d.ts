import { Socket } from 'net';
import { EventEmitter } from 'stream';

declare module 'ws' {
  class WebSocket extends EventEmitter {
    _socket: Socket;
  }
}
