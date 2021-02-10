const fs = require('fs'),
    bufferSizeBytes = 256;
let readBytesCount = 0;
let fileEndReached = false;
let fileHandle;
let logFile;
let logParser;
let tryCount = 0;

class LogReader {

    constructor() {
    }

    doReadFile(file, parser) {
        logFile = file;
        logParser = parser;

        setTimeout(tryReadFile, 1000);

        function tryReadFile() {
            fs.open(logFile, 'r', function (err, fd) {
                if (err) {
                    console.log(`failed reading log file from ${logFile} (try: ${tryCount})`);
                    tryCount += 1;
                    if (tryCount < 10) {
                        setTimeout(tryReadFile, 10000);
                    }
                } else {
                    console.log(`log file opened: ${logFile}`);
                    fileHandle = fd;
                    readBytes();
                }
            });
        }

        function readBytes() {
            const stats = fs.fstatSync(fileHandle);
            if (stats.size < readBytesCount + 1) {
                // nothing to be read currently, wait a second
                fileEndReached = true;
                setTimeout(readBytes, 1000);
            } else {
                fs.read(fileHandle, new Buffer(bufferSizeBytes), 0, bufferSizeBytes, readBytesCount, processBytes);
            }
        }

        function processBytes(err, byteCount, buff) {

            if (err) {
                console.log("error reading log: " + err);
            } else {
                logParser.parseString(buff.toString('utf-8', 0, byteCount), !fileEndReached);

                // So we continue reading from where we left:
                readBytesCount += byteCount;
                process.nextTick(readBytes);
            }
        }
    }
}

exports.LogReader = LogReader;
