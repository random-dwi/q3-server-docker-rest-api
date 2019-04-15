
const events = ['status'];

export function registerSocket(rconEvent, socket) {
    // Bind model events to socket events
    for (const event of events) {
        const listener = createListener(`rcon:${event}`, socket);
        rconEvent.on(event, listener);
        socket.on('disconnect', removeListener(rconEvent, event, listener));
    }
}


function createListener(event, socket) {
    return function(doc) {
        socket.emit(event, doc);
    };
}

function removeListener(rconEvent, event, listener) {
    return function() {
        rconEvent.removeListener(event, listener);
    };
}
