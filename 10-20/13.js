const pragma = (func, _, ...args) => func.apply(null, args);

const express = <require>express</require>;
const app = <express />;
const port = 3000;

<app.get>/{(req, res) => <res.send>Hello World!</res.send>}</app.get>;

<app.listen>
  {port}
  {() => <console.log>Example app listening on port {port}!</console.log>}
</app.listen>;

// $ npx babel 13.js
// const pragma = (func, _, ...args) => func.apply(null, args);

// const express = pragma("require", null, "express");
// const app = pragma("express", null);
// const port = 3000;
// pragma(app.get, null, "/", (req, res) => pragma(res.send, null, "Hello World!"));
// pragma(app.listen, null, port, () => pragma(console.log, null, "Example app listening on port ", port, "!"));

// $ npx babel-node 13.js
// 13.js:1
// const pragma = (func, _, ...args) => func.apply(null, args);
//                                           ^
// TypeError: func.apply is not a function
