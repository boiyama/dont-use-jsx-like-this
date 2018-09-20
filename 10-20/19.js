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

const DoneHandler = msg => err =>
  err ? (
    <console.error>{err.message}</console.error>
  ) : (
    <console.log>{msg}</console.log>
  );

const InsertHandler = () =>
  function(err) {
    return err ? (
      <console.error>{err.message}</console.error>
    ) : (
      <console.log>{this.lastID}</console.log>
    );
  };

const AllHandler = () => (err, rows) =>
  err ? (
    <console.error>{err.message}</console.error>
  ) : (
    <console.log>{rows}</console.log>
  );

const Process = db => (
  <>
    <db.serialize this={db}>
      {() => (
        <>
          <db.run this={db}>
            CREATE TABLE IF NOT EXISTS members ( id integer PRIMARY KEY
            AUTOINCREMENT, name text NOT NULL )
            <DoneHandler>Created the table.</DoneHandler>
          </db.run>

          <db.run this={db}>
            INSERT INTO members (name) VALUES ("Yamamoto")
            <InsertHandler />
          </db.run>

          <db.all this={db}>
            SELECT * FROM members
            <AllHandler />
          </db.all>
        </>
      )}
    </db.serialize>

    <db.close this={db}>
      <DoneHandler>Close the database connection.</DoneHandler>
    </db.close>
  </>
);

const App = sqlite3 => (
  <sqlite3.Database new callback={Process}>
    ./app.db
    <DoneHandler>Connected to the database.</DoneHandler>
  </sqlite3.Database>
);

<require
  callback={sqlite3 => <sqlite3.verbose this={sqlite3} callback={App} />}
>
  sqlite3
</require>;

// $ npx babel-node 19.js
// Connected to the database.
// 1
// { id: 1, name: 'Yamamoto' }
// Close the database connection.
