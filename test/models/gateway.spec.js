import chai from 'chai';
import crypto from 'crypto'
import Gateway from '../../src/models/gateway/gateway.model';
import hello from '../../src';

const should = chai.should();

const sampleGateway1 = {
  id: '12345678901234567890abcd',
  name: "Test Buono",
  gwMac: crypto.randomBytes(8).toString('hex'),
  commercialId: 'commercialId'
};

const sampleGateway2 = {
  id: '12345678901234567890abca',
  name: "Test Duplicato",
  gwMac: sampleGateway1.gwMac,
  commercialId: 'commercialId'
};

const sampleGateway3 = {
  id: '12345678901234567890abca',
  band: 'banda'
};


describe('Gateway Model', () => {


  const gateway = new Gateway(sampleGateway1);
  const duplicatedGateway = new Gateway(sampleGateway2);
  const badGateway = new Gateway(sampleGateway3);


  const gatewayUpdates = {
    gwMac: crypto.randomBytes(8).toString('hex')
  };

  it('New Gateway Should Be Valid', (done) => {

    gateway.isValid((res) => {
      res.should.be.true;
      done();
    });
  });

  it('New Gateway Should NOT Be Valid', (done) => {
    badGateway.save((err, savedGateway) => {
      should.exist(err);
      let errors = savedGateway.errors;
      errors.hasOwnProperty('gwMac').should.be.true;
      errors.hasOwnProperty('band').should.be.true;
      errors.hasOwnProperty('commercialId').should.be.true;
      errors.hasOwnProperty('name').should.be.true;
      done();
    })
  });

  it('Should Exist New Gateway', () => {
    should.exist(gateway);
  });

  it('Should BE And Object', () => {
    gateway.should.be.an('object');
  });

  it('Should Match ID', () => {
    gateway.id.should.eql(sampleGateway1.id);
  });

  it('Should Match gwMac', () => {
    gateway.gwMac.should.eql(sampleGateway1.gwMac);
  });

  it('Should Save Gateway', (done) => {
    gateway.isValid((res) => {
      if (res) gateway.save(done);
      else console.error(gateway.errors);
    });
  });

  it('Should Read Gateway', (done) => {
    Gateway.findById(sampleGateway1.id, (err, gateway) => {
      should.not.exist(err);
      gateway.gwMac.should.be.eql(sampleGateway1.gwMac);
      gateway.id.should.be.eql(sampleGateway1.id);
      done()
    })
  });

  it('Should NOT Read a wrong Gateway', (done) => {
    Gateway.findById(sampleGateway1.id+"1", (err, gateway) => {
      should.not.exist(err);
      should.not.exist(gateway);
      done()
    })
  });

  it('Should NOT Save Gateway', (done) => {

    duplicatedGateway.isValid((res) => {
      res.should.be.false;

      duplicatedGateway.save((err, savedGateway) => {
        should.exist(err);
        let errors = savedGateway.errors;
        errors.hasOwnProperty('gwMac').should.be.true;

        done();
      });
    });
  });

  it('Should Update Gateway', (done) => {
    Gateway.findById(sampleGateway1.id, (err) => {
      should.not.exist(err);
      should.exist(gateway);
      gateway.gwMac = gatewayUpdates.gwMac;
      gateway.isValid((res) => {
        if (res)
          gateway.save((err, savedGateway) => {
            should.not.exist(err);
            savedGateway.gwMac.should.eql(gatewayUpdates.gwMac);
            done();
          });
        else console.error(gateway.errors);
      });

    })
  });


  it('Should Delete Gateway', (done) => {
    Gateway.findById(sampleGateway1.id, async (err, gateway) => {
      should.not.exist(err);
      should.exist(gateway);
      gateway.destroy( () => {
        Gateway.findById(sampleGateway1.id, async (err, deletedGateway) => {
          should.not.exist(err);
          should.not.exist(deletedGateway);
          done()
        })
      });
    })
  });

});
