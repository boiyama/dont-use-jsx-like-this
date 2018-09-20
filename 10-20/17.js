const pragma = (func, props, ...args) => {
  if (typeof func === "string") {
    func = eval(func);
  }

  let returnValue;
  if (props && props.this) {
    returnValue = func.apply(props.this, args);
  } else {
    returnValue = func.apply(null, args);
  }

  if (props && props.callback) {
    props.callback(returnValue);
  }

  return returnValue;
};

const pragmaFrag = () => undefined;

const port = 3000;

const HelloHandler = () => (req, res) => (
  <res.send this={res}>Hello World!</res.send>
);

const ListenHandler = port => () => (
  <console.log>Example app listening on port {port}!</console.log>
);

const Config = port => app => (
  <>
    <app.get this={app}>
      /<HelloHandler />
    </app.get>
    <app.listen this={app}>
      {port}
      <ListenHandler>{port}</ListenHandler>
    </app.listen>
  </>
);

const App = port => Express => <Express callback={Config(port)} />;

<require callback={App(port)}>express</require>;

// $ npx babel-node 17.js
// Example app listening on port  3000 !

// $ curl http://localhost:3000
// Hello World!
