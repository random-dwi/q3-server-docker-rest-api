let io;

export function registerLogEvents(ioServer) {
    io = ioServer;
}

export function emitLogEvent(type, time, content) {
    console.log(`type: ${type} time: ${time} content: ${JSON.stringify(content)}`)
    io.emit(type, {time: time, data: content});
}
