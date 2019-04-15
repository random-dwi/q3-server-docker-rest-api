/**
 *  Application schema
 *
 *  @version     0.0.1
 *  @created     2019-03-18T15:47:02.608Z
 *  @link        https://camintejs.com/
 *  @wiki        https://github.com/biggora/caminte/wiki
 *
 *  Created by create-model script
 * */

/**
 *  Define  Application Model
 *  @param  {Object}  schema
 *  @return {Object}  model
 *
 *  @wiki   https://github.com/biggora/caminte/wiki/Defining-a-Model
 * */

import caminte from 'caminte';
import ApplicationFunctions from './application.functions';
import config from '../../config/index';

const caminteSchema = new caminte.Schema('redis', config.redis);

function application(schema) {
  const model = 'application';
  const Application = schema.define(model, {
    id: { type: schema.String, limit: 24, required: true, unique: true },
    tenant: {type: schema.String, limit: 24, required: true},
    name: {type: schema.String},
    endpointsDefaultAPI: {type: schema.Boolean},
    endpointsProtocol: {type: schema.String},
    endpointsUrl: {type: schema.String},
    //TODO Capire come mettere le settings
    endpointsTimeout: {type: schema.Number},
    lockedAppUp: { type: schema.Boolean, default: false },
    lockedAppDown: { type: schema.Boolean, default: false },
    lockedUserUp: { type: schema.Boolean, default: false },
    lockedUserDown: { type: schema.Boolean, default: false },
    lockedAdminUp: { type: schema.Boolean, default: false },
    lockedAdminDown: { type: schema.Boolean, default: false },
  }, {

  });

  /**
   *  Define any custom method
   *  or setup validations here
   **/
  Application.validatesPresenceOf('id', 'name', 'tenant', 'endpointsDefaultAPI', 'endpointsProtocol','endpointsUrl');
  Application.validate('tenant', ApplicationFunctions.hexValidator.call(this, 24, 'tenant'), { message: 'Bad tenant' });


  return Application;
}

const applicationClass = application(caminteSchema);
export { application, applicationClass as default };
