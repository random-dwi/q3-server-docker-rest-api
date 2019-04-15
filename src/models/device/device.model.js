/**
 *  Device schema
 *
 *  @version     0.0.1
 *  @created     2019-03-18T15:47:02.608Z
 *  @link        https://camintejs.com/
 *  @wiki        https://github.com/biggora/caminte/wiki
 *
 *  Created by create-model script
 * */

/**
 *  Define  Device Model
 *  @param  {Object}  schema
 *  @return {Object}  model
 *
 *  @wiki   https://github.com/biggora/caminte/wiki/Defining-a-Model
 * */

import caminte from 'caminte';
import DeviceFunctions from './device.functions';
import config from '../../config/index';

const caminteSchema = new caminte.Schema('redis', config.redis);

function device(schema) {
  const model = 'device';
  const Device = schema.define(model, {
    id: { type: schema.String, limit: 24, required: true, unique: true },
    appEui: { type: schema.String, limit: 16, index: true },
    devEui: { type: schema.String, limit: 16, index: true, unique: true },
    appKey: { type: schema.String, limit: 32 },
    devAddr: { type: schema.String, limit: 8, index: true },
    appSKey: { type: schema.String, limit: 32 },
    nwkSKey: { type: schema.String, limit: 32 },
    cntUp: { type: schema.Number, default: 0 },
    cntDown: { type: schema.Number, default: 0 },
    bit32counter: { type: schema.Boolean, default: true }, //TODO Valutare se mettere null come valore di default
    band: { type: schema.String, limit: 9, default: 'EU863-870' },
    name: {type: schema.string},
    lastActivity: { type: schema.Date },
    commercialId: { type: schema.String, required: true },
    application: { type: schema.String, limit: 24 },
    otaActivation: { type: schema.Boolean, default: true },
    encryptedActivation: { type: schema.Boolean },
    encryptedPayload: { type: schema.Boolean },
    payloadParser: { type: schema.String, limit: 24 },
    settingsDlRx2DataRate: { type: schema.Number },
    settingsDlRx1Offset: { type: schema.Number },
    settingsDlRxDelay: { type: schema.Number },
    adrEnabled: {type: schema.Boolean, default: true}, //TODO Valutare se mettere come valore di default false
    //adrAlghoritm: {type: schema.String} //TODO Aggiungere dopo aver implementato la selezione dell'algoritmo nel network-controller
    adrHistoryLimit: {type: schema.Number, default: 20},
    adrMarginDb: {type: schema.Number, default: 10},
    lockedNsUp: { type: schema.Boolean, default: false },
    lockedNsDown: { type: schema.Boolean, default: false },
    lockedUserUp: { type: schema.Boolean, default: false },
    lockedUserDown: { type: schema.Boolean, default: false },
    lockedAdminUp: { type: schema.Boolean, default: false },
    lockedAdminDown: { type: schema.Boolean, default: false }
  }, {

  });

  /**
   * Define any custom method
   * or setup validations here
   **/

  Device.validatesPresenceOf('id', 'name','commercialId');
  Device.validatesUniquenessOf('devEui', {message: 'devEui is not unique'});
  Device.validatesNumericalityOf('cntUp', { int: true }, { message: 'Bad cntUp' });
  Device.validatesNumericalityOf('cntDown', { int: true }, { message: 'Bad cntDown' });
  Device.validatesInclusionOf('band', {in: ['EU863-870']});
  Device.validate('appEui', DeviceFunctions.hexValidator.call(this, 16, 'appEui'), { message: 'Bad appEui' });
  Device.validate('devEui', DeviceFunctions.hexValidator.call(this, 16, 'devEui'), { message: 'Bad devEui' });
  Device.validate('appKey', DeviceFunctions.hexValidator.call(this, 32, 'appKey'), { message: 'Bad appKey' });
  Device.validate('devAddr', DeviceFunctions.hexValidator.call(this, 8, 'devAddr'), { message: 'Bad devAddr' });
  Device.validate('appSKey', DeviceFunctions.hexValidator.call(this, 32, 'appSKey'), { message: 'Bad appSKey' });
  Device.validate('nwkSKey', DeviceFunctions.hexValidator.call(this, 32, 'nwkSKey'), { message: 'Bad nwkSKey' });
  Device.validate('otaActivation', DeviceFunctions.activationValidator.call(this), { message: 'Bad Activation' });



  Device.afterCreate = function afterCreate(next) {
    DeviceFunctions.postCreateHandler.call(this, schema, model, next);
  };

  // Device.afterInitialize = function afterInitialize(next) {
  //   DeviceFunctions.getDhcpAddr.call(this, schema, model, next);
  // };

  Device.beforeUpdate = async function beforeSave(next) {
    await DeviceFunctions.preUpdate.call(this, schema, model, next);
  };

  Device.afterUpdate = async function afterSave(next) {
    await DeviceFunctions.postUpdate.call(this, schema, model, next);
  };

  Device.afterDestroy = function afterDestroy(next) {
    DeviceFunctions.postDeleteHandler.call(this, schema, model, next);
  };
  return Device;
}

const deviceClass = device(caminteSchema);
export { device, deviceClass as default };
