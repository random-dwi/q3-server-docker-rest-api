/**
 *  Gateway schema
 *
 *  @version     0.0.1
 *  @created     2019-03-18T15:47:02.608Z
 *  @link        https://camintejs.com/
 *  @wiki        https://github.com/biggora/caminte/wiki
 *
 *  Created by create-model script
 * */

/**
 *  Define  Gateway Model
 *  @param  {Object}  schema
 *  @return {Object}  model
 *
 *  @wiki   https://github.com/biggora/caminte/wiki/Defining-a-Model
 * */

import caminte from 'caminte';
import GatewayFunctions from './gateway.functions';
import config from '../../config/index';

const caminteSchema = new caminte.Schema('redis', config.redis);

function gateway(schema) {
  const model = 'gateway';
  const Gateway = schema.define(model, {
    id: { type: schema.String, limit: 24, required: true },
    name: { type: schema.String, required: true },
    gwMac: { type: schema.String, limit: 16, index: true, unique: true },
    lastActivity: { type: schema.Date },
    band: { type: schema.String, limit: 32, default: 'EU863-870' },
    commercialId: { type: schema.String, required: true },
    nwkIpUp: {type: schema.String, limit: 15},
    nwkIpDown: {type: schema.String, limit: 15},
    nwkPortUp: {type: schema.Number},
    nwkPortDown: {type: schema.Number},
    lockedNbUp: { type: schema.Boolean, default: false },
    lockedNbDown: { type: schema.Boolean, default: false },
    lockedUserUp: { type: schema.Boolean, default: false },
    lockedUserDown: { type: schema.Boolean, default: false },
    lockedAdminUp: { type: schema.Boolean, default: false },
    lockedAdminDown: { type: schema.Boolean, default: false }
  }, {

  });

  /**
   *  Define any custom method
   *  or setup validations here
   * */

  Gateway.validatesPresenceOf('id', 'name','gwMac', 'commercialId');
  Gateway.validatesInclusionOf('band', {in: ['EU863-870']});
  Gateway.validatesUniquenessOf('gwMac', {message: 'gwMac is not unique'});
  Gateway.validate('gwMac', GatewayFunctions.hexValidator.call(this, 16, 'gwMac'), { message: 'Bad gwMac' });

  return Gateway;
}

const gatewayClass = gateway(caminteSchema);
export { gateway, gatewayClass as default };
