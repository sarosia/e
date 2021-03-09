import d from '../src/d.js';
import chai from 'chai';
const {expect} = chai;

describe('d', () => {
  const func = d({
    '"",""': (a, b) => {
      return `${a} add ${b}`;
    },
    '1,["",[]],[]': (a, b, c) => {
      return `${a} ${b[0]} ${b[1].join(',')} ${c.join(',')}`;
    },
    '[],[]': (a, b) => {
      return a.concat(b);
    },
    '1,1': (a, b) => {
      return a + b;
    },
  });

  it('string', () => {
    expect(func('a', 'b')).to.be.equal('a add b');
  });

  it('array', () => {
    expect(func([1], [2])).to.be.deep.equal([1, 2]);
  });

  it('number', () => {
    expect(func(3, 4)).to.be.equal(7);
  });

  it('nested', () => {
    expect(func(2, ['a', ['b', 'c', 'd']], ['e', 'f', 'g']))
        .to.be.equal('2 a b,c,d e,f,g');
  });

  it('no match', () => {
    expect(() => {
      func('hello', 2);
    }).to.throw('No matching function found for arguments "hello,2".');
  });
});
