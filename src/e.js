/**
 * e is a general purpose function to manipulate HTML DOM elements. In general
 * it will return a DOMElement as a result.
 *
 * If the first argument is a string, it will return the element matching with
 * that ID, or null if not elements is associated with that ID. The subsequce
 * arguments will be used for update its attribute and children. For example,
 *
 * e('div1') is equivalent to document.getElementById('div1').
 * e('div', {'style': 'color: red'}, 'Hello world') is equivalent to the
 * following statements:
 *
 *   const div = document.getElementById('div1');
 *   div.setAttribute('style', 'color: red');
 *   div.innerHTML = 'Hello world';
 *
 * If the param is an array, creates an HTML element based on the items in the
 * array and return the element. The array should be in the form of the
 * following:
 *
 *   element := [type, {attributes...}, children]
 *   children := [elements...]|text
 *
 * If the children is a list of array, construct the children recursively and
 * append to the current node. If the children is a string, simply set the
 * node's innerHTML.
 *
 * @return {HTMLElement}
 */
import d from './d.js';

const getElement = function(param) {
  return document.getElementById(param);
};

const setAttributes = function(elm, attributes) {
  for (const [key, value] of Object.entries(attributes)) {
    if (key.startsWith('on')) {
      elm.addEventListener(key.substr(2), value);
    } else {
      elm.setAttribute(key, value);
    }
  }
  return elm;
};

const updateChildren = function(elm, children) {
  elm.innerHTML = '';
  if (children.length > 0 && !(children[0] instanceof Array)) {
    children = [children];
  }
  for (const child of children) {
    const childElm = e(child);
    elm.appendChild(childElm);
  }
  return elm;
};

const updateInnerHTML = function(elm, innerHTML) {
  elm.innerHTML = innerHTML;
  return elm;
};

const buildElement = function(param) {
  const [type, attributes, children] = param;
  const elm = document.createElement(type);
  if (attributes !== undefined) {
    setAttributes(elm, attributes);
  }
  if (children !== undefined) {
    updateChildren(elm, children);
  }
  return elm;
};

const e = d({
  '""': (id) => {
    return getElement(id);
  },
  '"",{}': (id, attributes) => {
    return setAttributes(e(id), attributes);
  },
  '"",{},[]': (id, attributes, children) => {
    return updateChildren(e(id, attributes), children);
  },
  '"",{},""': (id, attributes, innerHTML) => {
    return updateInnerHTML(e(id, attributes), innerHTML);
  },
  '"",""': (id, innerHTML) => {
    return updateInnerHTML(e(id), innerHTML);
  },
  '"",[]': (id, children) => {
    return updateChildren(e(id), children);
  },
  '[]': (elm) => {
    return buildElement(elm);
  },
});

export {e as default};
