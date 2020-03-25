import Q3RCon from "quake3-rcon";
import {parseStatus} from './rcon/rcon.utils';

let rcon = new Q3RCon({
    address: process.env.Q3SERV_HOST || '192.168.120.4',
    port: process.env.Q3SERV_PORT || 27960, // optional
    password: process.env.Q3SERV_PASS || 'uniquake3',
    debug: process.env.Q3SERV_RCON_DBG || true // optional
});

let io;

export function registerRconEvents(ioServer) {
    io = ioServer;
    setInterval(emitStatusEvent, 3000);
}

function emitStatusEvent() {
    rcon.send('status', function (response) {
        let res = parseStatus()(response);
        io.emit('rcon:status', res);
    });
}
