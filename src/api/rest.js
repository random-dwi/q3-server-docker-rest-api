import http from 'http';
import express from 'express';
import socketio from 'socket.io';

import {config, default as restConfigurator} from '../config/express';
import routes from './index';
import {registerRconEvents} from './rcon.events'
import {LogReader} from "../lib/logReader";
import {LogParser} from "../lib/logParser";
import {registerLogEvents} from "./log.events";

export default function runServer() {
  let app = express();
  let server = http.createServer(app);
  restConfigurator(app);
  routes(app);

  const io = socketio(server);

  registerLogEvents(io);
  registerRconEvents(io);

  io.on('connection', function(socket){
    console.log("client connected");
  });

  server.listen(config.port, config.ip, function() {
    process.stdout.write(`Express Server bound To ${config.host} on port ${config.port}\n`);
  });

  const logFile = process.env.Q3LOG_FILE || 'server.log';

  const reader = new LogReader();
  const logParser = new LogParser();
  reader.doReadFile(logFile, logParser);

  return server;

}
