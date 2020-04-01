import {emitLogEvent} from "../api/log.events";

class LogParser {

  constructor() {
    this.unfinishedLine = "";
    this.currentGame = undefined;
  }

  parseString(input, oldLog) {

    input = this.unfinishedLine + input;

    let lines = input.split(/[\n]/);

    if (!input.trim().endsWith("\n")) {
      this.unfinishedLine = lines.pop();
    }

    lines.map((line) => {
      // match "<time> <logType>: <logInfo>" e.g. "12:23 ClientConnect: 2"
      let matched = line.match(/(\d+:\d+)\s+(\w+):\s*(.*)/);

      if (!matched) {
        if (line.trim() !== "" && !line.includes("----------")) {
          console.log(`cannot handle line: "${line}"`);
        }
        return;
      }

      const time = matched[1];
      const logType = matched[2];
      const logInfo = matched[3];

      if (logType == null) {
        return;
      }

      switch (logType) {
        case 'InitGame':
          this.currentGame = {};
          initGame(this.currentGame, time, logInfo, oldLog);
          break;
        case 'ClientConnect':
          clientConnect(this.currentGame, time, logInfo, oldLog);
          break;
        case 'ClientUserinfoChanged':
          clientUserInfoChanged(this.currentGame, time, logInfo, oldLog);
          break;
        case 'ClientBegin':
          clientBegin(this.currentGame, time, logInfo, oldLog);
          break;
        case 'ClientDisconnect':
          clientDisconnect(this.currentGame, time, logInfo, oldLog);
          break;
        case 'Kill':
          kill(this.currentGame, time, logInfo, oldLog);
          break;
        case 'Item':
          item(this.currentGame, time, logInfo, oldLog);
          break;
        case 'Exit':
          exit(this.currentGame, time, logInfo, oldLog);
          break;
        case 'score':
          score(this.currentGame, time, logInfo, oldLog);
          break;
        case 'red':
          red(this.currentGame, time, logInfo, oldLog);
          break;
        case 'ShutdownGame':
          shutdownGame(this.currentGame, time, logInfo, oldLog);
          break;
        case 'say':
          say(this.currentGame, time, logInfo, oldLog);
          break;
        default:
          console.log(`"unhandled log type: ${logType}`);
      }

      if (this.currentGame && this.currentGame.exited && logType !== 'Exit' && logType !== 'score') {
        endGame(this.currentGame, time, logInfo, oldLog)
      }
    });
  }
}

function initGame(currentGame, time, logInfo, oldLog) {

  currentGame.properties = {};
  currentGame.players = {};
  currentGame.timeLimitHit = false;
  currentGame.fragLimitHit = false;
  currentGame.captureLimitHit = false;
  currentGame.properties = extractSlashDelimited(logInfo);

  if (!oldLog) {
    emitLogEvent('gameStart', time, currentGame);
  }
}

function clientConnect(currentGame, time, logInfo, oldLog) {
  const id = parseInt(logInfo.trim());
  currentGame.players[id] = {id: id, playing: false};
  if (!oldLog) {
    emitLogEvent('playerConnect', time, currentGame.players[id]);
  }
}

function clientUserInfoChanged(currentGame, time, logInfo, oldLog) {
  const parts = logInfo.trim().split(" ", 2);
  const id = parseInt(parts[0]);
  const userInfo = extractSlashDelimited(parts[1]);
  userInfo["id"] = id;
  currentGame.players[id] = userInfo;
  if (!oldLog) {
    emitLogEvent('playerInfoChanged', time, currentGame.players[id]);
  }
}

function clientBegin(currentGame, time, logInfo, oldLog) {
  const id = parseInt(logInfo.trim());
  let player = currentGame.players[id];
  player.playing = true;
  if (!oldLog) {
    emitLogEvent('playerBegin', time, player);
  }
}

function clientDisconnect(currentGame, time, logInfo, oldLog) {
  const id = parseInt(logInfo.trim());
  let player = currentGame.players[id];
  delete currentGame.players[id];
  if (!oldLog) {
    emitLogEvent('playerDisconnect', time, player);
  }
}

function kill(currentGame, time, logInfo, oldLog) {
  // 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT
  let matched = logInfo.match(/(\d+)\s(\d+)\s(\d+):\s.+\sby\s(.+)/);

  const killerId = parseInt(matched[1]);
  const victimId = parseInt(matched[2]);
  const weaponId = parseInt(matched[3]);
  const weapon = matched[4];

  let killer;

  if (killerId === 1022) {
    killer = {id: 1022, n: "<world>"}
  } else {
    killer = currentGame.players[killerId];
  }

  let victim = currentGame.players[victimId];

  const eventContent = {killer: compactPlayer(killer), victim: compactPlayer(victim), weapon: {id: weaponId, n: weapon}};
  if (!oldLog) {
    emitLogEvent('kill', time, eventContent);
  }
}

function item(currentGame, time, logInfo, oldLog) {
  const parts = logInfo.trim().split(" ", 2);
  const id = parseInt(parts[0]);
  const item = {item: parts[1], player: compactPlayer(currentGame.players[id])};
  if (!oldLog) {
    emitLogEvent('item', time, item);
  }
}

function exit(currentGame, time, logInfo, oldLog) {
  // Exit: Timelimit hit.
  let matched = logInfo.match(/(Time|Frag|Capture)limit hit./);

  const limit = matched[1];

  switch (limit) {
    case 'Time':
      currentGame.timeLimitHit = true;
      break;
    case 'Frag':
      currentGame.fragLimitHit = true;
      break;
    case 'Capture':
      currentGame.captureLimitHit = true;
      break;
  }
  currentGame.exited = true;
}

function score(currentGame, time, logInfo, oldLog) {
  // score: 20  ping: 4  client: 4 Zeh
  let matched = logInfo.match(/(\d+)\s+ping:\s+\d+\s+client:\s+(\d+)\s+.+/);

  const scoreValue = parseInt(matched[1]);
  const id = parseInt(matched[2]);

  currentGame.players[id].score = scoreValue;
}

function red(currentGame, time, logInfo, oldLog) {
  // red:8  blue:6
  let matched = logInfo.match(/(\d+)\s+blue:\s*(\d+)/);

  const scoreRed = parseInt(matched[1]);
  const scoreBlue = parseInt(matched[2]);

  currentGame.teamScores = {red: scoreRed, blue: scoreBlue};
}

function endGame(currentGame, time, logInfo, oldLog) {
  currentGame.exited = false;
  if (!oldLog) {
    emitLogEvent('gameEnd', time, currentGame);
  }
}

function shutdownGame(currentGame, time, logInfo, oldLog) {
  if (!oldLog) {
    emitLogEvent('gameShutdown', time, currentGame);
  }
}

function say(currentGame, time, logInfo, oldLog) {
  if (!oldLog) {
    emitLogEvent('say', time, logInfo);
  }
}

function extractSlashDelimited(value) {

  value = value.trim();

  if (value.startsWith("\\")) {
    value = value.substr(1);
  }

  let items = value.trim().split(/[\\]/);

  let obj = {};

  for (let i = 1; i < items.length; i+=2) {
    const key = items[i-1];
    obj[key] = items[i];
  }

  return obj;
}

function compactPlayer(player) {
  return {id: player.id, n: player.n};
}

exports.LogParser = LogParser;

