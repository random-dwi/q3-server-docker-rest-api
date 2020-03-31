const fs = require('fs');

export function getMapList() {
    return new Promise((resolve, reject) => {
        let obj;
        fs.readFile(__dirname + '/maps.json', 'utf8', function (err, data) {
            if (err) throw err;
            obj = JSON.parse(data);
            resolve(obj);
        });
    });
}
