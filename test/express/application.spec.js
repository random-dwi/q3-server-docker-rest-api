import chai from 'chai';
import { config } from '../../src/config/express';
const Client = require('node-rest-client').Client;

const path = 'api/applications/';
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

const sampleApplication1 = {
  id: '12345678901234567890abcd',
  name: "Test Buono",
  tenant: '12345678901234567890abcd',
  endpointsDefaultAPI: false,
  endpointsProtocol: 'prova',
  endpointsUrl: 'prova',
  commercialId: 'commercialId'
};

const sampleApplication2 = {
  id: '12345678901234567890abce',
  name: "Test Buono",
  tenant: '12345678901234567890abcd',
  endpointsDefaultAPI: false,
  endpointsProtocol: 'prova',
  endpointsUrl: 'prova',
  commercialId: 'commercialId'
};

const sampleApplication3 = {
  id: '12345678901234567890abca',
};

const sampleApplication4 = {
  id: '12345678901234567890abcd',
  name: "Test Duplicato",
  tenant: '12345678901234567890aaaa',
  endpointsDefaultAPI: false,
  endpointsProtocol: 'provaduplicato',
  endpointsUrl: 'provaduplicato',
  commercialId: 'commercialId'
};

const deleteAndCheck = function(client, id) {
  return new Promise((resolve, reject) => {
    let args = {
      path: {"id": id}
    };
    client.methods.deleteApplication(args, (data, response) => {
      response.statusCode.should.be.eql(statusCodes.entityDestroyed);
      client.methods.getApplication(args, (data, response) => {
        response.statusCode.should.be.eql(statusCodes.entityNotFound);
        resolve();
      });
    });
  });
};

const saveAndCheck = function(client, application) {
  return new Promise((resolve, reject) => {
    let args = {
      data: application,
      headers: { "Content-Type": "application/json" }
    };

    client.methods.saveApplication(args, (data, response) => {
      response.statusCode.should.be.eql(statusCodes.entityCreated);
      resolve();
    });
  });
};

describe('Application Express', () => {


  var client = new Client();
  client.registerMethod('getApplications', url + path, 'GET');
  client.registerMethod('saveApplication', url + path, 'POST');
  client.registerMethod('getApplication', url + path + '${id}', 'GET');
  client.registerMethod('deleteApplication', url + path + '${id}', 'DELETE');
  client.registerMethod('updateApplication', url + path + '${id}', 'PUT');

  const applicationUpdates = {
    tenant: '12345678901234567890eeee'
  };


       it('Should create Applications', (done) => {
         let preAsync = [saveAndCheck(client, sampleApplication1), saveAndCheck(client, sampleApplication2)];

         Promise.all(preAsync).then(() => done());
       });

       it('Should find Application', (done) => {
         let args = {
           path: {"id": sampleApplication1.id}
         };

         client.methods.getApplication(args, (data, response) => {
           response.statusCode.should.be.eql(statusCodes.entityFound);

           data.id.should.be.eql(sampleApplication1.id);
           done();
         })
       });

       it('Should get all Applications', (done) => {
         client.methods.getApplications((data, response) => {
           response.statusCode.should.be.eql(statusCodes.entityFound);

           data.length.should.be.eql(2);
           let keys = [sampleApplication1.id, sampleApplication2.id];
           for (let i in data) {
             keys.should.include(data[i].id);
           }
           done();
         });
       });


       it('Should NOT create Application', (done) => {
         let args = {
           data: sampleApplication3,
           headers: {"Content-Type": "application/json"}
         };
         client.methods.saveApplication(args, (data, response) => {
           response.statusCode.should.be.eql(statusCodes.saveError);
           data.hasOwnProperty('name').should.be.true;
           data.hasOwnProperty('tenant').should.be.true;
           data.hasOwnProperty('endpointsDefaultAPI').should.be.true;
           data.hasOwnProperty('endpointsProtocol').should.be.true;
           data.hasOwnProperty('endpointsUrl').should.be.true;

           args.data = sampleApplication4;

           client.methods.saveApplication(args, (data, response) => {
             response.statusCode.should.be.eql(statusCodes.entityAlreadyExists);
             data.hasOwnProperty('id').should.be.true;
             done();
           });
         });
       });

       it('Should update Application', (done) => {
         let args = {
           path: {"id": sampleApplication1.id},
           data: applicationUpdates,
           headers: {"Content-Type": "application/json"}
         };
         client.methods.updateApplication(args, (data, response) => {
           response.statusCode.should.be.eql(statusCodes.entityUpdated);
           client.methods.getApplication(args, (data, response) => {
             response.statusCode.should.be.eql(statusCodes.entityFound);
             data.tenant.should.be.eql(applicationUpdates.tenant);
             done();
           })
         })
       });



       it('Should delete Applications', (done) => {
         let preAsync = [deleteAndCheck(client, sampleApplication1.id), deleteAndCheck(client, sampleApplication2.id)];

         Promise.all(preAsync).then(() => done());
       });
});
