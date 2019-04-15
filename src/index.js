import config from './config';
import runServer from './api/rest.js'
import Q3RCon  from 'quake3-rcon'

export default function hello(user = 'World') {
  return `Hello ${user}!\n`;
}

if (require.main === module) {
    /*process.stdout.write(hello());
  const sub = redis.createClient(config.redis);
  sub.psubscribe('device:*');

  sub.on('pmessage', (pattern, channel, message) => {
    console.log(`sub:${message}`);
  });

  // const Device = device(schema);

  const dev = new Device({
    id: '12345678901234567890abcd',
    devEui: '967BC2AC3C39D377',
    appEui: 'DD2178EA38A2128D',
    name: 'Giorgio',
    appKey: '12312312123123121231231212312312',
    commercialId: 'commercialId'
  });

  dev.save((err, savedDevice) => {
    if (err) console.error(dev.errors);

  });*/

 runServer();
}
