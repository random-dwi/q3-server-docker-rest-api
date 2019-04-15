import chai from 'chai';
import crypto from 'crypto'
import { config } from '../../src/config/express';
const Client = require('node-rest-client').Client;

const path = 'api/gateways/';
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

const sampleGateway1 = {
  id: '123456789012345678901111',
  name: "Test Buono",
  gwMac: crypto.randomBytes(8).toString('hex'),
  commercialId: 'commercialId'
};

const sampleGateway2 = {
  id: '123456789012345678901122',
  name: "Test Buono",
  gwMac: crypto.randomBytes(8).toString('hex'),
  commercialId: 'commercialId'
};

const sampleGateway3 = {
  id: '123456789012345678901111',
  name: "Test Duplicato",
  gwMac: sampleGateway1.gwMac,
  commercialId: 'commercialId'
};

const sampleGateway4 = {
  id: '123456789012345678901111',
  band: 'banda'
};

const deleteAndCheck = function(client, id) {
  return new Promise((resolve, reject) => {
    let args = {
      path: {"id": id}
    };
    client.methods.deleteGateway(args, (data, response) => {
      response.statusCode.should.be.eql(statusCodes.entityDestroyed);
      client.methods.getGateway(args, (data, response) => {
        response.statusCode.should.be.eql(statusCodes.entityNotFound);
        resolve();
      });
    });
  });
};

const saveAndCheck = function(client, gateway) {
  return new Promise((resolve, reject) => {
    let args = {
      data: gateway,
      headers: { "Content-Type": "application/json" }
    };

    client.methods.saveGateway(args, (data, response) => {
      response.statusCode.should.be.eql(statusCodes.entityCreated);
      resolve();
    });
  });
};

describe('Gateway Express', () => {


  var client = new Client();
  client.registerMethod('getGateways', url + path, 'GET');
  client.registerMethod('saveGateway', url + path, 'POST');
  client.registerMethod('getGateway', url + path + '${id}', 'GET');
  client.registerMethod('deleteGateway', url + path + '${id}', 'DELETE');
  client.registerMethod('updateGateway', url + path + '${id}', 'PUT');

  const gatewayUpdates = {
    gwMac: crypto.randomBytes(8).toString('hex')
  };



       it('Should create Gateways', (done) => {
         let preAsync = [saveAndCheck(client, sampleGateway1), saveAndCheck(client, sampleGateway2)];

         Promise.all(preAsync).then(() => done());
       });

       it('Should find Gateway', (done) => {
         let args = {
           path: {"id": sampleGateway1.id}
         };

         client.methods.getGateway(args, (data, response) => {
           response.statusCode.should.be.eql(statusCodes.entityFound);

           data.id.should.be.eql(sampleGateway1.id);
           done();
         })
       });

       it('Should get all Gateways', (done) => {
         client.methods.getGateways((data, response) => {
           response.statusCode.should.be.eql(statusCodes.entityFound);

           data.length.should.be.eql(2);
           let keys = [sampleGateway1.id, sampleGateway2.id];
           for (let i in data) {
             keys.should.include(data[i].id);
           }
           done();
         });
       });


       it('Should NOT create Gateway', (done) => {
         let args = {
           data: sampleGateway4,
           headers: {"Content-Type": "application/json"}
         };
         client.methods.saveGateway(args, (data, response) => {
           response.statusCode.should.be.eql(statusCodes.saveError);
           data.hasOwnProperty('commercialId').should.be.true;
           data.hasOwnProperty('gwMac').should.be.true;
           data.hasOwnProperty('band').should.be.true;

           args.data = sampleGateway3;

           client.methods.saveGateway(args, (data, response) => {
             response.statusCode.should.be.eql(statusCodes.entityAlreadyExists);
             data.hasOwnProperty('id').should.be.true;
             done();
           });
         });
       });

       it('Should update Gateway', (done) => {
         let args = {
           path: {"id": sampleGateway1.id},
           data: gatewayUpdates,
           headers: {"Content-Type": "application/json"}
         };
         client.methods.updateGateway(args, (data, response) => {
           response.statusCode.should.be.eql(statusCodes.entityUpdated);
           client.methods.getGateway(args, (data, response) => {
             response.statusCode.should.be.eql(statusCodes.entityFound);
             data.gwMac.should.be.eql(gatewayUpdates.gwMac);
             done();
           })
         })
       });



       it('Should delete Gateways', (done) => {
         let preAsync = [deleteAndCheck(client, sampleGateway1.id), deleteAndCheck(client, sampleGateway2.id)];

         Promise.all(preAsync).then(() => done());
       });
});
