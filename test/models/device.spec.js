import chai from 'chai';
import crypto from 'crypto'
import DeviceSync from '../../src/models/device/device.model';
import hello from '../../src';
import Bluebird from 'bluebird';

const should = chai.should();

const Device = Bluebird.promisifyAll(DeviceSync, {suffix: 'Asyn'});

const sampleDevice1 = {
  id: '12345678901234567890abcd',
  devEui: crypto.randomBytes(8).toString('hex'),
  appEui: crypto.randomBytes(8).toString('hex'),
  band: 'banda',
  otaActivation : true
};

const sampleDevice2 = {
  id: '12345678901234567890abcd',
  name: "Test Buono",
  devEui: crypto.randomBytes(8).toString('hex'),
  appEui: crypto.randomBytes(8).toString('hex'),
  appKey: crypto.randomBytes(16).toString('hex'),
  commercialId: 'commercialId',
  otaActivation : true
};

const sampleDevice3 = {
  id: '12345678901234567890abca',
  name: "Test duplica",
  devEui: sampleDevice2.devEui,
  appEui: crypto.randomBytes(8).toString('hex'),
  appKey: crypto.randomBytes(16).toString('hex'),
  otaActivation : true
};

const sampleDevice4 = {
  id: '12345678901234567890abcd',
  name: "Test ABP Buono",
  devAddr: crypto.randomBytes(4).toString('hex'),
  nwkSKey: crypto.randomBytes(16).toString('hex'),
  appSKey: crypto.randomBytes(16).toString('hex'),
  commercialId: 'commercialId',
  otaActivation : false
};

describe('Device Model', () => {

  const badDevice = new Device(sampleDevice1);
  const goodOTAADevice = new Device(sampleDevice2);
  const duplicatedOTAADevice = new Device(sampleDevice3);
  const goodABPDevice = new Device(sampleDevice4);

  const checkIndexes = function check(string, value) {
    return new Promise((resolve, reject) => {
      Device.schema.adapter.client.exists([string], (err, res) => {
        should.not.exist(err);
        res.should.be.eql(value);
        resolve();
      });
    })
  };

  const saveAsync = function save(device) {
    return new Promise((resolve, reject) => {
      device.save((err, savedDevice) => {
        should.not.exist(err);
        should.exist(savedDevice);
        resolve(savedDevice);
      });
    });
  };


  const oTAAdeviceUpdates = {
    devEui: crypto.randomBytes(8).toString('hex'),
    appEui: crypto.randomBytes(8).toString('hex'),
    devAddr: crypto.randomBytes(4).toString('hex'),
    nwkSKey: crypto.randomBytes(16).toString('hex')
  };


       it('New Device1 Should NOT Be Valid', () => {
         badDevice.isValid((res) => {
           res.should.be.false;
           let error = badDevice.errors;
           error.hasOwnProperty('band').should.be.true;
           error.hasOwnProperty('commercialId').should.be.true;
           error.hasOwnProperty('name').should.be.true;

           badDevice.appKey = crypto.randomBytes(16)
             .toString('hex');
           badDevice.devEui = crypto.randomBytes(7)
             .toString('hex');

           badDevice.isValid((res) => {
             res.should.be.false;
             badDevice.devEui = crypto.randomBytes(8)
               .toString('hex');
           });
         });

         //badDevice.isValid().should.be.true;
       });

       it('New OTAA Device Should Be Valid', () => {
         goodOTAADevice.isValid((res) => {
           res.should.be.true;
         });
       });

       it('Should Exist New OTAA Device', () => {
         should.exist(goodOTAADevice);
       });

       it('Should BE And Object', () => {
         goodOTAADevice.should.be.an('object');
       });

       it('Should Match ID', () => {
         goodOTAADevice.id.should.eql(sampleDevice2.id);
       });

       it('Should Match devEui', () => {
         goodOTAADevice.devEui.should.eql(sampleDevice2.devEui);
       });

       it('Should Save OTAA Device', (done) => {
         goodOTAADevice.save((err, savedDevice) => {
           should.not.exist(err);
           done();
         });

       });

       it('Should Read OTAA Device', (done) => {

         Device.findById(sampleDevice2.id, (err, dev) => {
           should.not.exist(err);
           dev.appEui.should.be.eql(sampleDevice2.appEui);
           dev.id.should.be.eql(sampleDevice2.id);
           done()
         })
       });

       it('Should NOT Read a wrong Device', (done) => {
         Device.findById(sampleDevice2.id+"1", (err, dev) => {
           should.not.exist(err);
           should.not.exist(dev);
           done()
         })
       });

      it('Should NOT Save OTAA Device', (done) => {
        duplicatedOTAADevice.save((err, savedDevice) => {
          should.exist(err);
          let errors = savedDevice.errors;
          errors.hasOwnProperty('commercialId').should.be.true;
          errors.hasOwnProperty('devEui').should.be.true;
          done();

        });

      });

       it('Should Update Device', (done) => {

         Device.findByIdAsyn(sampleDevice2.id)
           .then((device) => {
             should.exist(device);


             let previousDevEui = device.devEui;
             let previousAppEui = device.appEui;
             device.devEui = oTAAdeviceUpdates.devEui;
             device.appEui = oTAAdeviceUpdates.appEui;


             saveAsync(device)
               .then((savedDevice) => {
                 savedDevice.appEui.should.eql(oTAAdeviceUpdates.appEui);
                 savedDevice.devEui.should.eql(oTAAdeviceUpdates.devEui);
                 let preAsync = [
                   checkIndexes(`c:${Device.modelName}:${previousDevEui}:${previousAppEui}`, 0),
                   checkIndexes(`c:${Device.modelName}:${savedDevice.devEui}:${savedDevice.appEui}`, 1)
                 ];

                 Promise.all(preAsync)
                   .then(() => {
                     device.nwkSKey = oTAAdeviceUpdates.nwkSKey;
                     device.devAddr = oTAAdeviceUpdates.devAddr;

                     saveAsync(device)
                       .then((savedDevice) => {
                         savedDevice.nwkSKey.should.eql(oTAAdeviceUpdates.nwkSKey);
                         savedDevice.devAddr.should.eql(oTAAdeviceUpdates.devAddr);
                         checkIndexes(`c:${Device.modelName}:${savedDevice.devAddr}:${savedDevice.nwkSKey}`, 1)
                           .then(done());
                       });
                   });
               });
           });
       });

       it('Should Delete OTAA Device', (done) => {

         Device.findById(sampleDevice2.id, async (err, device) => {
           should.not.exist(err);
           should.exist(device);
           let devEui = device.devEui;
           let appEui = device.appEui;
           let devAddr = device.devAddr;
           let nwkSKey = device.nwkSKey;
           device.destroy( () => {
             Device.findById(sampleDevice2.id, async (err, deletedDevice) => {
               should.not.exist(err);
               should.not.exist(deletedDevice);
               let preAsync = [
                 checkIndexes(`c:${Device.modelName}:${devEui}:${appEui}`, 0),
                 checkIndexes(`c:${Device.modelName}:${devAddr}:${nwkSKey}`, 0)];

               Promise.all(preAsync).then(done());
             });
           });
         })
       });

       it('New APB Device Should Be Valid', () => {
         goodABPDevice.isValid((res) => {
           res.should.be.true;
         });
       });

       it('Should Save ABP Device', (done) => {
         goodABPDevice.save(done);
       });

       it('Should Read ABP Device', (done) => {

         Device.findById(sampleDevice4.id, (err, dev) => {
           should.not.exist(err);
           dev.devAddr.should.be.eql(sampleDevice4.devAddr);
           dev.nwkSKey.should.be.eql(sampleDevice4.nwkSKey);
           dev.appSKey.should.be.eql(sampleDevice4.appSKey);
           dev.otaActivation.should.be.false;
           done()
         })
       });


       it('Should Delete OTAA Device', (done) => {
         Device.findById(sampleDevice4.id, async (err, device) => {
           should.not.exist(err);
           should.exist(device);
           device.destroy( () => {
             Device.findById(sampleDevice4.id, async (err, deletedDevice) => {
               should.not.exist(err);
               should.not.exist(deletedDevice);
               done();
        })
      });
    })
  });
});
