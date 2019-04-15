import hello from '../src/index.js';

let chai = require('chai');

chai.should();

function grabStdout() {
  const write = process.stdout.write;
  let content = '';
  process.stdout.write = (chunk, encoding, cb) => {
    content += chunk.toString();
    return write(chunk, encoding, cb);
  }

  return {
    letGo: () => {
        process.stdout.write = write;
    },
    content: content,
  };
}

describe('index.js', () => {
  it('Should Say Hello World!', () => {
    const greetings = hello();
    greetings.should.eql('Hello World!\n');
  })

  it('Should Not Say Banana!', () => {

    const greetings = hello();
    greetings.should.not.eql('Banana!\n');
  })
});
