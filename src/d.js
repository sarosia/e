/*
 * A javascript dispatching module to dispatch function calls based on argument
 * types. This mimics overloading but is also enchanced with a much more
 * sophisficated (i.e., nested) type matching algorithm.
 *
 * The type is defined as a prototype, for example, when "" is used to match a
 * string, 0 is used to match a number and [] is used to match an array. Note
 * that nested matching can be done for arrays, by declaring elements in the
 * array. For example, use ["", "", 0] to match an array with 3 elements, while
 * the 1st and 2nd elements are a string and the 3rd element is a number.
 *
 * Usage:
 * const add = d({
 *   '0': (a) => { return a; },
 *   '[0, 0], [0, 0]]': (a, b) => {
 *     return [add(a[0], b[0]), add(a[1], b[1])];
 *   },
 * });
 */
function isSameType(a, b) {
  if (a instanceof Array && b instanceof Array) {
    if (a.length > 0) {
      return isSameTypes(a, b);
    }
  }
  return a.constructor === b.constructor;
}

function isSameTypes(as, bs) {
  if (as.length !== bs.length) {
    return false;
  }
  for (const [i, a] of as.entries()) {
    if (!isSameType(a, bs[i])) {
      return false;
    }
  }
  return true;
}

const d = function(defs) {
  const candidates = [];
  for (const [key, func] of Object.entries(defs)) {
    const type = JSON.parse(`[${key}]`);
    candidates.push({
      accept: (args) => {
        return isSameType(type, args);
      },
      func: func,
    });
  }
  return function(...args) {
    for (const candidate of candidates) {
      if (candidate.accept(args)) {
        return candidate.func(...args);
      }
    }
    throw new Error(`No matching function found for arguments "${args}".`);
  };
};

export {d as default};
