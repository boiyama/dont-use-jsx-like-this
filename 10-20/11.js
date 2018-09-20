const pragma = (func, _, ...args) => func.apply(null, args);

<console.log>
  <Math.sqrt>{2}</Math.sqrt>
  <Math.pow>
    {2}
    {4}
  </Math.pow>
  <Math.ceil>
    <Math.random />
  </Math.ceil>
</console.log>;

// $ npx babel 11.js
// const pragma = (func, _, ...args) => func.apply(null, args);

// pragma(console.log, null, pragma(Math.sqrt, null, 2), pragma(Math.pow, null, 2, 4), pragma(Math.ceil, null, pragma(Math.random, null)));

// $ npx babel-node 11.js
// 1.4142135623730951 16 1
