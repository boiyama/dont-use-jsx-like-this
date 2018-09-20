const pragma = (func, props, ...args) => {
  if (typeof func === "string") {
    func = eval(func);
  }

  let returnValue;
  if (props && props.this) {
    returnValue = func.apply(props.this, args);
  } else if (props && props.new) {
    returnValue = new (Function.prototype.bind.apply(func, [null, ...args]))();
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

const DoneHandler = msg => err =>
  err ? (
    <console.error>{err.message}</console.error>
  ) : (
    <console.log>{msg}</console.log>
  );

const QueryDatabase = (sqlite3, process) => (
  <sqlite3.Database
    new
    callback={db => (
      <>
        {process(db)}
        <db.close this={db}>
          <DoneHandler>Close the database connection.</DoneHandler>
        </db.close>
      </>
    )}
  >
    ./app.db
    <DoneHandler>Connected to the database.</DoneHandler>
  </sqlite3.Database>
);

const ListMembersResponse = res => (err, rows) =>
  err ? (
    <>
      <console.error>{err.message}</console.error>
      <res.status
        this={res}
        callback={res => <res.send this={res}>{err.message}</res.send>}
      >
        {500}
      </res.status>
    </>
  ) : (
    <res.json this={res}>{rows}</res.json>
  );

const ListMembersHandler = sqlite3 => (req, res) => (
  <QueryDatabase>
    {sqlite3}
    {db => (
      <db.all this={db}>
        SELECT * FROM members
        <ListMembersResponse>{res}</ListMembersResponse>
      </db.all>
    )}
  </QueryDatabase>
);

const ListenHandler = port => () => (
  <console.log>Example app listening on port {port}!</console.log>
);

const Config = (port, sqlite3) => app => (
  <>
    <app.get this={app}>
      /<HelloHandler />
    </app.get>
    <app.get this={app}>
      /members
      <ListMembersHandler>{sqlite3}</ListMembersHandler>
    </app.get>
    <app.listen this={app}>
      {port}
      <ListenHandler>{port}</ListenHandler>
    </app.listen>
  </>
);

const App = (port, Express) => sqlite3 => (
  <>
    <QueryDatabase>
      {sqlite3}
      {db => (
        <db.run this={db}>
          CREATE TABLE IF NOT EXISTS members ( id integer PRIMARY KEY
          AUTOINCREMENT, name text NOT NULL )
          <DoneHandler>Created the table.</DoneHandler>
        </db.run>
      )}
    </QueryDatabase>
    <Express callback={Config(port, sqlite3)} />
  </>
);

<require
  callback={express => (
    <require
      callback={sqlite3 => (
        <sqlite3.verbose this={sqlite3} callback={App(port, express)} />
      )}
    >
      sqlite3
    </require>
  )}
>
  express
</require>;

// $ npx babel-node 20.js
// Example app listening on port  3000 !

// $ curl http://localhost:3000/members
// [{"id":1,"name":"Yamamoto"}]
