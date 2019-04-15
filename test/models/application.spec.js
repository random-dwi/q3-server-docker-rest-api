import chai from 'chai';
import crypto from 'crypto';
import Application from '../../src/models/application/application.model';
import hello from '../../src';

const should = chai.should();

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
  id: '12345678901234567890abca',
};

describe('Application Model', () => {


  const application = new Application(sampleApplication1);
  const badApplication = new Application(sampleApplication2);


  const applicationUpdates = {
    tenant: '12345678901234567890eeee'
  };

  it('New Application Should Be Valid', (done) => {

    application.isValid((res) => {
      res.should.be.true;
      done();
    });
  });

  it('New Application Should NOT Be Valid', (done) => {
    badApplication.save((err, savedApplication) => {
      should.exist(err);
      let errors = savedApplication.errors;
      errors.hasOwnProperty('name').should.be.true;
      errors.hasOwnProperty('tenant').should.be.true;
      errors.hasOwnProperty('endpointsDefaultAPI').should.be.true;
      errors.hasOwnProperty('endpointsProtocol').should.be.true;
      errors.hasOwnProperty('endpointsUrl').should.be.true;
      done();
    })
  });

  it('Should Exist New Application', () => {
    should.exist(application);
  });

  it('Should BE And Object', () => {
    application.should.be.an('object');
  });

  it('Should Match ID', () => {
    application.id.should.eql(sampleApplication1.id);
  });

  it('Should Match tenant', () => {
    application.tenant.should.eql(sampleApplication1.tenant);
  });

  it('Should Save Application', (done) => {
    application.isValid((res) => {
      if (res) application.save(done);
      else console.error(application.errors);
    });
  });

  it('Should Read Application', (done) => {
    Application.findById(sampleApplication1.id, (err, application) => {
      should.not.exist(err);
      application.tenant.should.be.eql(sampleApplication1.tenant);
      application.id.should.be.eql(sampleApplication1.id);
      done()
    })
  });

  it('Should NOT Read a wrong Application', (done) => {
    Application.findById(sampleApplication1.id+"1", (err, application) => {
      should.not.exist(err);
      should.not.exist(application);
      done()
    })
  });

  it('Should Update Application', (done) => {
    Application.findById(sampleApplication1.id, (err) => {
      should.not.exist(err);
      should.exist(application);
      application.tenant = applicationUpdates.tenant;
      application.isValid((res) => {
        if (res)
          application.save((err, savedApplication) => {
            should.not.exist(err);
            savedApplication.tenant.should.eql(applicationUpdates.tenant);
            done();
          });
        else console.error(application.errors);
      });

    })
  });


  it('Should Delete Application', (done) => {
    Application.findById(sampleApplication1.id, async (err, application) => {
      should.not.exist(err);
      should.exist(application);
      application.destroy( () => {
        Application.findById(sampleApplication1.id, async (err, deletedApplication) => {
          should.not.exist(err);
          should.not.exist(deletedApplication);
          done()
        })
      });
    })
  });
});
