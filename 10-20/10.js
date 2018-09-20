const pragma = (func, _, ...args) => func.apply(null, args);

<console.log>Hello World!</console.log>;

// $ npx babel 11.js
// const pragma = (func, _, ...args) => func.apply(null, args);

// pragma(console.log, null, "Hello World!");

// $ npx babel-node 11.js
// Hello World!
