const fs = require('fs'),
    bufferSizeBytes = 256;
let readBytesCount = 0;
let fileEndReached = false;
let fileHandle;

class LogReader {

    constructor() {
    }

    doReadFile(logFile, logParser) {
        return new Promise((resolve, reject) => {

            fs.open(logFile, 'r', function (err, fd) {
                if (err) {
                    reject(err);
                } else {
                    fileHandle = fd;
                    readBytes();
                }
            });
        }).catch((err) => {
            return {
                error: "500",
                message: err.message
            };
        });

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
