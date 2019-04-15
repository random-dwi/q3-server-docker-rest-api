import http from 'http';
import express from 'express';
import socketio from 'socket.io';

import { default as restConfigurator, config } from '../config/express';
import routes from './index';
import {registerSocket} from "./socket";
import { RconEvents, registerEvents} from './rcon.events'

export default function runServer() {
  let app = express();
  let server = http.createServer(app);
  restConfigurator(app);
  routes(app);

  const io = socketio(server);
  const rconEE = new RconEvents();
  let rconEEi = registerEvents(rconEE);

  io.on('connection', function(socket){
    registerSocket(rconEEi, socket)
  });

  server.listen(config.port, config.ip, function() {
    process.stdout.write(`Express Server bound To ${config.host} on port ${config.port}\n`);
  });


  return server;

}
