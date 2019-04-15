import redis from 'redis';
import Device from './device.model'

export default class DeviceFunctions {

  static addDeviceToEuiCache(schema, model) {
    return new Promise((resolve, reject) => {
      schema.adapter.client.set([
        `c:${model}:${this.devEui}:${this.appEui}`,
        JSON.stringify({ id: this.id }),
      ], (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  static addDeviceToAddrCache(schema, model) {
    return new Promise((resolve, reject) => {
      schema.adapter.client.set([
        `c:${model}:${this.devAddr}:${this.nwkSKey}`,
        JSON.stringify({ id: this.id, nwkSKey: this.nwkSKey }),
      ], (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  static removeDeviceFromEuiCache(schema, model) {
    return new Promise((resolve, reject) => {
      schema.adapter.client.del([`c:${model}:${this.devEui}:${this.appEui}`], (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  static removeDeviceFromAddrCache(schema, model) {
    return new Promise((resolve, reject) => {
      schema.adapter.client.del([`c:${model}:${this.devAddr}:${this.nwkSKey}`], (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  static async preUpdate(schema, model, next) {
    Device.findById(this.id, (err, oldDevice) => {
      if (oldDevice) {
        const preAsyncHandlers = [
          DeviceFunctions.removeDeviceFromEuiCache.call(oldDevice, schema, model),
          DeviceFunctions.removeDeviceFromAddrCache.call(oldDevice, schema, model),
        ];
        Promise.all(preAsyncHandlers).then(() => next());
      } else  next();
    })
  }


  static async postUpdate(schema, model, next) {
    const preAsyncHandlers = [
      DeviceFunctions.removeDeviceFromEuiCache.call(this, schema, model),
      DeviceFunctions.removeDeviceFromAddrCache.call(this, schema, model),
    ];
    await Promise.all(preAsyncHandlers);

    const asyncHandlers = [];
    if (this.devEui && this.appEui) {
      asyncHandlers.push(DeviceFunctions.addDeviceToEuiCache.call(this, schema, model));
    }
    if (this.devAddr && this.nwkSKey) {
      asyncHandlers.push(DeviceFunctions.addDeviceToAddrCache.call(this, schema, model));
    }

    Promise.all(asyncHandlers)
      .then(() => next());
    schema.adapter.client.publish([`device:update:${this.id}`, JSON.stringify(this)]);
  }

  static postCreateHandler(schema, model, next) {
    const asyncHandlers = [];
    if (this.devEui && this.appEui) {
      asyncHandlers.push(DeviceFunctions.addDeviceToEuiCache.call(this, schema, model));
    }
    if (this.devAddr && this.nwkSKey) {
      asyncHandlers.push(DeviceFunctions.addDeviceToAddrCache.call(this, schema, model));
    }
    Promise.all(asyncHandlers)
      .then(() => next());
    schema.adapter.client.publish([`device:create:${this.id}`, JSON.stringify(this)]);
  }

  static postDeleteHandler(schema, model, next) {
    const preAsyncHandlers = [
      DeviceFunctions.removeDeviceFromEuiCache.call(this, schema, model),
      DeviceFunctions.removeDeviceFromAddrCache.call(this, schema, model),
    ];
    Promise.all(preAsyncHandlers)
      .then(() => next());
    schema.adapter.client.publish([`device:remove:${this.id}`, JSON.stringify(this)]);
  }

  static hexValidator(length, prop) {
    return function e(err) {
      if (this[prop]) {
        if (typeof this[prop] !== 'string')  err();
        if (this[prop].length !== length)  err();
        const testPatt = new RegExp(`[0-9a-fA-F]{${length}}`);
        if (!testPatt.test(this[prop])) err();
      }
    };
  }

  static activationValidator() {
    return function e(err) {
      if (this.otaActivation) {
        if (!this.devEui ||
          !this.appEui ||
          !this.appKey) err();
      } else {
        if (!this.devAddr ||
          !this.appSKey ||
          !this.nwkSKey) err();

        // if (typeof this[prop] !== 'string') return err();
        // if (this[prop].length !== length) return err();
        // const testPatt = new RegExp(`[0-9a-fA-F]{${length}}`);
        // if (!testPatt.test(this[prop])) err();
      }
    };
  }
  // static hexValidator(length, prop) {
  //   return (err) => {
  //     return err();
  //     console.log(this[prop]);
  //     const testPatt = new RegExp(`/[0-9a-fA-F]{${length}/g`);
  //     if (!testPatt.test(this[prop])) err();
  //   };
  // }

  static beforeValidation(next) {
    console.log(this);
  }

}
