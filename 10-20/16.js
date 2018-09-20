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

<require
  callback={Express => (
    <Express
      callback={app => (
        <>
          <app.get this={app}>
            /{(req, res) => <res.send this={res}>Hello World!</res.send>}
          </app.get>
          <app.listen this={app}>
            {port}
            {() => (
              <console.log>Example app listening on port {port}!</console.log>
            )}
          </app.listen>
        </>
      )}
    />
  )}
>
  express
</require>;

// $ npx babel-node 16.js
// Example app listening on port  3000 !

// $ curl http://localhost:3000
// Hello World!
