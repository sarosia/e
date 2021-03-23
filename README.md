# e

[![Build Status][build-image]][build-url]
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

e is a general purpose function to manipulate HTML DOM elements.

## Usage

If the first argument is a string, it will return the element matching with that ID, or null if not elements is associated with that ID. The subsequce arguments will be used for update its attribute and children. For example,

`e('div1')` is equivalent to `document.getElementById('div1')`.
`e('div', {'style': 'color: red'}, 'Hello world')` is equivalent to the following statements:

```js
const div = document.getElementById('div1');
div.setAttribute('style', 'color: red');
div.innerHTML = 'Hello world';
```

If the param is an array, creates an HTML element based on the items in the array and return the element. The array should be in the form of the following:

```
element := [type, {attributes...}, children]
children := [elements...]|text
```

If the children is a list of array, construct the children recursively and append to the current node. If the children is a string, simply set the node's innerHTML.

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@sarosia/e.svg
[npm-url]: https://npmjs.org/package/@sarosia/e
[downloads-image]: https://img.shields.io/npm/dm/@sarosia/e
[downloads-url]: https://npmjs.org/package/@sarosia/e
[build-image]: https://github.com/sarosia/e/workflows/Node.js%20CI/badge.svg
[build-url]: https://github.com/sarosia/e/actions
