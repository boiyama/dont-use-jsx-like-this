const pragma = (func, _, ...args) => {
  if (typeof func === "string") {
    func = eval(func);
  }
  return func.apply(null, args);
};

const express = <require>express</require>;
const app = <express />;
const port = 3000;

<app.get>/{(req, res) => <res.send>Hello World!</res.send>}</app.get>;

<app.listen>
  {port}
  {() => <console.log>Example app listening on port {port}!</console.log>}
</app.listen>;

// $ npx babel-node 14.js
// node_modules/express/lib/application.js:479
//     this.lazyrouter();
//          ^
// TypeError: Cannot read property 'lazyrouter' of null
