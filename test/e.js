import {JSDOM} from 'jsdom';
global.document = new JSDOM().window.document;
import e from '../src/e.js';
import chai from 'chai';
const {expect} = chai;

describe('e', () => {
  let dom;
  beforeEach(() => {
    dom = new JSDOM('<div id="container">Testing</div>');
    global.document = dom.window.document;
  });

  it('simple', () => {
    expect(e('container').innerHTML).to.be.equal('Testing');
  });

  it('build', () => {
    document.body.appendChild(e(['div', {'class': 'button'}]));
    expect(dom.serialize()).to.be.equal(
        '<html><head></head><body><div id="container">Testing</div>' +
        '<div class="button"></div></body></html>');
  });

  it('update', () => {
    e('container', {}, [['div', {'class': 'button'}]]);
    expect(dom.serialize()).to.be.equal(
        '<html><head></head><body><div id="container">' +
        '<div class="button"></div></div></body></html>');
  });
});
