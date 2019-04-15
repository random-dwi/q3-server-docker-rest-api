export function parseStatus() {
    return function(rconData) {
        let resObj = {players : []};
        if (rconData) {
            rconData = rconData.replace(/ {2,}/g, ' ');
            const rconArr = rconData.split('\n');
            resObj.currentMap = rconArr[1].split(' ')[1];
            for (let i = 4; i <rconArr.length ; i++) {
                let row = rconArr[i].trim().split(' ');
                let player = {};
                player.cl = row.splice(0,1)[0];
                player.score = row.splice(0,1)[0];
                player.ping = row.splice(0,1)[0];
                player.rate = row.splice(-1,1)[0];
                player.address = row.splice(-1,1)[0];
                player.name = row.join(' ');
                // resObj.players.push(_.zipObject(rconArr[2].split(' '), rconArr[i].trim().split(' ')));
                resObj.players.push(player);
            }
            resObj.raw = rconData;
            return resObj;
        }
    };
}
export function parseServerInfo() {
    return function(rconData) {
        if (rconData) {
            rconData = rconData.split('\n')
                .map(line => line.replace(/( {2,})/g, ' ').split(' '))
                .map(line =>  { return { name : line[0], value: line.slice(1).join(' ') } })
                    // .map( { line.length > 2 ? [ line [0], line.slice(1).join(' ')] : line })
                .slice(2);
            return rconData ;
            // resObj.currentMap = rconArr[1].split(' ')[1];
            // for (let i = 4; i <rconArr.length ; i++) {
            //     let row = rconArr[i].trim().split(' ');
            //     let player = {};
            //     player.cl = row.splice(0,1)[0];
            //     player.score = row.splice(0,1)[0];
            //     player.ping = row.splice(0,1)[0];
            //     player.rate = row.splice(-1,1)[0];
            //     player.address = row.splice(-1,1)[0];
            //     player.name = row.join(' ');
            //     // resObj.players.push(_.zipObject(rconArr[2].split(' '), rconArr[i].trim().split(' ')));
            //     resObj.players.push(player);
            // }
            // resObj.raw = rconData;
            // return resObj;
        }
    };
}
