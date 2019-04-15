import chai from 'chai';
import crypto from 'crypto'
import { config } from '../../src/config/express';
const Client = require('node-rest-client').Client;

const path = 'api/devices/';
const url = 'http://' + config.host + ':' + config.port + '/';


const should = chai.should();

const statusCodes = {
  saveError: 422,
  entityAlreadyExists: 422,
  entityNotFound: 404,
  entityFound: 200,
  entityCreated: 201,
  entityUpdated: 200,
  entityDestroyed: 204
};

const sampleDevice1 = {
  id: '12345678901234567890abcd',
  name: "Test Buono",
  devEui: crypto.randomBytes(8).toString('hex'),
  appEui: crypto.randomBytes(8).toString('hex'),
  appKey: crypto.randomBytes(16).toString('hex'),
  commercialId: 'commercialId',
  otaActivation : true
};

const sampleDevice2 = {
  id: '12345678901234567890abca',
  name: "Test duplica",
  devEui: sampleDevice1.devEui,
  appEui: crypto.randomBytes(8).toString('hex'),
  appKey: crypto.randomBytes(16).toString('hex'),
  otaActivation : true
};

const sampleDevice3 = {
  id: '12345678901234567890abcf',
  name: "Test ABP Buono",
  devAddr: crypto.randomBytes(4).toString('hex'),
  nwkSKey: crypto.randomBytes(16).toString('hex'),
  appSKey: crypto.randomBytes(16).toString('hex'),
  commercialId: 'commercialId',
  otaActivation : false
};

const deleteAndCheck = function(client, id) {
  return new Promise((resolve, reject) => {
    let args = {
      path: {"id": id}
    };
    client.methods.deleteDevice(args, (data, response) => {
      response.statusCode.should.be.eql(statusCodes.entityDestroyed);
      client.methods.getDevice(args, (data, response) => {
        response.statusCode.should.be.eql(statusCodes.entityNotFound);
        resolve();
      });
    });
  });
};

const saveAndCheck = function(client, device) {
  return new Promise((resolve, reject) => {
    let args = {
      data: device,
      headers: { "Content-Type": "application/json" }
    };

    client.methods.saveDevice(args, (data, response) => {
      response.statusCode.should.be.eql(statusCodes.entityCreated);
      resolve();
    });
  });
};

describe('Device Express', () => {


  var client = new Client();
  client.registerMethod('getDevices', url + path, 'GET');
  client.registerMethod('saveDevice', url + path, 'POST');
  client.registerMethod('getDevice', url + path + '${id}', 'GET');
  client.registerMethod('deleteDevice', url + path + '${id}', 'DELETE');
  client.registerMethod('updateDevice', url + path + '${id}', 'PUT');

  const oTAAdeviceUpdates = {
    devEui: crypto.randomBytes(8).toString('hex'),
    appEui: crypto.randomBytes(8).toString('hex'),
    devAddr: crypto.randomBytes(4).toString('hex'),
    nwkSKey: crypto.randomBytes(16).toString('hex')
  };

       it('Should create Device', (done) => {
         let preAsync = [saveAndCheck(client, sampleDevice1), saveAndCheck(client, sampleDevice3)];

         Promise.all(preAsync).then(() => done());
       });

       it('Should find Device', (done) => {
         let args = {
           path: {"id": sampleDevice1.id}
         };

         client.methods.getDevice(args, (data, response) => {
           response.statusCode.should.be.eql(statusCodes.entityFound);
           data.id.should.be.eql(sampleDevice1.id);
           done();
         })
       });

       it('Should get all Devices', (done) => {
         client.methods.getDevices((data, response) => {
           response.statusCode.should.be.eql(statusCodes.entityFound);

           data.length.should.be.eql(2);
           let keys = [sampleDevice1.id, sampleDevice3.id];
           for (let i in data) {
             keys.should.include(data[i].id);
           }
           done();
         });
       });


       it('Should NOT create Device', (done) => {
         let args = {
           data: sampleDevice2,
           headers: {"Content-Type": "application/json"}
         };
         client.methods.saveDevice(args, (data, response) => {
           response.statusCode.should.be.eql(statusCodes.saveError);
           data.hasOwnProperty('commercialId').should.be.true;
           data.hasOwnProperty('devEui').should.be.true;
           args.data = sampleDevice1;

           client.methods.saveDevice(args, (data, response) => {
             response.statusCode.should.be.eql(statusCodes.entityAlreadyExists);
             data.hasOwnProperty('id').should.be.true;
             done();
           });
         });
       });

       it('Should update Device', (done) => {
         let args = {
           path: {"id": sampleDevice1.id},
           data: oTAAdeviceUpdates,
           headers: {"Content-Type": "application/json"}
         };
         client.methods.updateDevice(args, (data, response) => {
           response.statusCode.should.be.eql(statusCodes.entityUpdated);
           client.methods.getDevice(args, (data, response) => {
             response.statusCode.should.be.eql(statusCodes.entityFound);
             data.devEui.should.be.eql(oTAAdeviceUpdates.devEui);
             data.appEui.should.be.eql(oTAAdeviceUpdates.appEui);
             data.devAddr.should.be.eql(oTAAdeviceUpdates.devAddr);
             data.nwkSKey.should.be.eql(oTAAdeviceUpdates.nwkSKey);
             done();
           })
         })
       });



       it('Should delete Devices', (done) => {
         let preAsync = [deleteAndCheck(client, sampleDevice1.id), deleteAndCheck(client, sampleDevice3.id)];

         Promise.all(preAsync).then(() => done());
       });
});
