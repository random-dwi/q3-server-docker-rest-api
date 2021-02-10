import http from 'http';
import express from 'express';
import socketio from 'socket.io';

import {config, default as restConfigurator} from '../config/express';
import routes from './index';
import {registerRconEvents} from './rcon.events'
import {LogReader} from "../log/logReader";
import {LogParser} from "../log/logParser";
import {registerLogEvents} from "./log.events";

export default function runServer() {
  let app = express();
  let server = http.createServer(app);
  restConfigurator(app);
  routes(app);

  const io = socketio(server);

  registerLogEvents(io);
  registerRconEvents(io);

  let clientConnected = false;

  io.on('connection', function(socket){
    console.log("client connected");
    clientConnected = true;
  });

  server.listen(config.port, config.ip, function() {
    process.stdout.write(`Express Server bound To ${config.host} on port ${config.port}\n`);
  });

  const logFile = process.env.Q3LOG_FILE || 'server.log';
  const logFromBeginning = (process.env.Q3LOG_READ_FROM_BEGINNING || 'false') !== 'false';

  const readLogs = function () {
    if (!logFromBeginning || clientConnected) {
      process.stdout.write("read logs");
      const reader = new LogReader();
      const logParser = new LogParser(logFromBeginning);
      reader.doReadFile(logFile, logParser);
    } else {
      console.log("waiting for client to attach...")
      setTimeout(readLogs, 1000);
    }
  }

  setTimeout(readLogs, 1000);

  return server;

}
