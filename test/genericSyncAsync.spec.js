import { expect } from 'chai'

describe('Mocha Async Tests', () => {
  it('works synchronously', () => {
    expect(true).to.equal(true)
  })

  it('works ansyncronously', done => {
    setTimeout(() => {
      expect(true).to.equal(true);
      done()
    }, 4)
  });

  it('throws errors synchronously', () => {
    return true
    throw new Error('it works')
  });

  it('throws errors ansyncronously', done => {
    setTimeout(() => {
      return done()
      done(new Error('it works'))
    }, 4)
  })

  it('uses promises', () => {
    var testPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Hello')
      }, 4)
    });

    testPromise.then(result => {
      expect(result).to.equal('Hello')
    }, reason => {
      throw new Error(reason)
    })
  });

  it('uses es7 async/await', async function(){
    const testPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Hello')
      }, 4)
    });

    try {
      const result = await testPromise;
      return expect(result).to.equal('Hello')
    } catch (err) {
      throw err
    }
  })

})
