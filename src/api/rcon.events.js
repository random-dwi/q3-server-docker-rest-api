const EventEmitter = require('events');
import Q3RCon from "quake3-rcon";
import {parseStatus} from './rcon/rcon.utils';

let rcon = new Q3RCon({
    address: process.env.Q3SERV_HOST || '192.168.120.4',
    port: process.env.Q3SERV_PORT || 27960, // optional
    password: process.env.Q3SERV_PASS || 'uniquake3',
    debug: process.env.Q3SERV_RCON_DBG || true // optional
});

let emitter;

export class RconEvents extends EventEmitter {}

export function registerEvents(emt) {
    emitter = emt;
    setInterval(emitStatusEvent, 3000);
    return emitter;
}

function  emitStatusEvent() {
    rcon.send('status', function(response) {
        let res = parseStatus()(response);
        emitter.emit('status',res)
    });
}
