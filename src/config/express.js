/**
 * Express configuration
 */

'use strict';

import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

const config = {
  port: process.env.REST_PORT || 9009,
  host: process.env.REST_addr || '127.0.0.1'
};


function expressConfigurator(app) {

  app.use(compression());
  app.use(cors());
  app.use(bodyParser.urlencoded({ limit: '1mb', extended: false }));
  app.use(bodyParser.json({ limit: '1mb' }));
  app.use((req, res, next) => {
    res.set('X-Powered-By', 'Pink-Unicorns');
    next()
  });
  app.use(morgan(':remote-addr - [:date[iso]] ":method :url HTTP/:http-version" (:status) :res[content-length] - :response-time ms'));

}

export { expressConfigurator as default, config }
