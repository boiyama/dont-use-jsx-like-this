const pragma = (func, props, ...args) => {
  if (typeof func === "string") {
    func = eval(func);
  }

  if (props && props.this) {
    return func.apply(props.this, args);
  } else {
    return func.apply(null, args);
  }
};

const express = <require>express</require>;
const app = <express />;
const port = 3000;

<app.get this={app}>
  /{(req, res) => <res.send this={res}>Hello World!</res.send>}
</app.get>;

<app.listen this={app}>
  {port}
  {() => <console.log>Example app listening on port {port}!</console.log>}
</app.listen>;

// $ npx babel-node 15.js
// Example app listening on port  3000 !

// $ curl http://localhost:3000
// Hello World!
