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

const CreateMemberResponse = (req, res) =>
  function(err) {
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
      <>
        <console.log>{this.lastID}</console.log>
        <res.json this={res}>
          {{ id: this.lastID, name: req.body.name }}
        </res.json>
      </>
    );
  };

const CreateMemberHandler = sqlite3 => (req, res) => (
  <QueryDatabase>
    {sqlite3}
    {db => (
      <db.run this={db}>
        INSERT INTO members(name) VALUES(?)
        {[req.body.name]}
        <CreateMemberResponse>
          {req}
          {res}
        </CreateMemberResponse>
      </db.run>
    )}
  </QueryDatabase>
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

const RetrieveMemberResponse = res => (err, row) =>
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
    <res.json this={res}>{row}</res.json>
  );

const RetrieveMemberHandler = sqlite3 => (req, res) => (
  <QueryDatabase>
    {sqlite3}
    {db => (
      <db.get this={db}>
        SELECT * FROM members WHERE id = ?{[req.params.id]}
        <ListMembersResponse>{res}</ListMembersResponse>
      </db.get>
    )}
  </QueryDatabase>
);

const UpdateMemberResponse = (req, res) =>
  function(err) {
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
      <>
        <console.log>{this.changes}</console.log>
        <res.json this={res}>
          {{ id: req.params.id, name: req.body.name }}
        </res.json>
      </>
    );
  };

const UpdateMemberHandler = sqlite3 => (req, res) => (
  <QueryDatabase>
    {sqlite3}
    {db => (
      <db.run this={db}>
        UPDATE members SET name = ? WHERE id = ?{[req.body.name, req.params.id]}
        <UpdateMemberResponse>
          {req}
          {res}
        </UpdateMemberResponse>
      </db.run>
    )}
  </QueryDatabase>
);

const DeleteMemberResponse = (req, res) =>
  function(err) {
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
      <>
        <console.log>{this.changes}</console.log>
        <res.status this={res} callback={res => <res.send this={res} />}>
          {204}
        </res.status>
      </>
    );
  };

const DeleteMemberHandler = sqlite3 => (req, res) => (
  <QueryDatabase>
    {sqlite3}
    {db => (
      <db.run this={db}>
        DELETE from members WHERE id = ?{[req.params.id]}
        <DeleteMemberResponse>
          {req}
          {res}
        </DeleteMemberResponse>
      </db.run>
    )}
  </QueryDatabase>
);

const ListenHandler = port => () => (
  <console.log>Example app listening on port {port}!</console.log>
);

const Config = (port, bodyParser, Cors, sqlite3) => app => (
  <>
    <app.use this={app}>
      <Cors />
    </app.use>
    <app.use this={app}>
      <bodyParser.json />
    </app.use>
    <app.get this={app}>
      /<HelloHandler />
    </app.get>
    <app.post this={app}>
      /members
      <CreateMemberHandler>{sqlite3}</CreateMemberHandler>
    </app.post>
    <app.get this={app}>
      /members
      <ListMembersHandler>{sqlite3}</ListMembersHandler>
    </app.get>
    <app.get this={app}>
      /members/:id
      <RetrieveMemberHandler>{sqlite3}</RetrieveMemberHandler>
    </app.get>
    <app.put this={app}>
      /members/:id
      <UpdateMemberHandler>{sqlite3}</UpdateMemberHandler>
    </app.put>
    <app.delete this={app}>
      /members/:id
      <DeleteMemberHandler>{sqlite3}</DeleteMemberHandler>
    </app.delete>
    <app.listen this={app}>
      {port}
      <ListenHandler>{port}</ListenHandler>
    </app.listen>
  </>
);

const App = (port, bodyParser, cors, Express, sqlite3) => (
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
    <Express callback={Config(port, bodyParser, cors, sqlite3)} />
  </>
);

<require
  callback={bodyParser => (
    <require
      callback={cors => (
        <require
          callback={express => (
            <require
              callback={sqlite3 => (
                <sqlite3.verbose
                  this={sqlite3}
                  callback={sqlite3 =>
                    App(port, bodyParser, cors, express, sqlite3)
                  }
                />
              )}
            >
              sqlite3
            </require>
          )}
        >
          express
        </require>
      )}
    >
      cors
    </require>
  )}
>
  body-parser
</require>;

// $ npx babel-node 21.js
// Example app listening on port  3000 !

// $ curl http://localhost:3000/members
// [{"id":1,"name":"Yamamoto"}]

// $ curl http://localhost:3000/members/1
// {"id":1,"name":"Yamamoto"}

// $ curl http://localhost:3000/members -X POST -H "Content-Type: application/json" -d '{"name": "Takahashi"}'
// {"id":2,"name":"Takahashi"}

// $ curl http://localhost:3000/members
// [{"id":1,"name":"Yamamoto"},{"id":2,"name":"Takahashi"}]

// $ curl http://localhost:3000/members/1 -X PUT -H "Content-Type: application/json" -d '{"name": "Suzuki"}'
// {"id":"1","name":"Suzuki"}

// $ curl http://localhost:3000/members
// [{"id":1,"name":"Suzuki"},{"id":2,"name":"Takahashi"}]

// $ curl http://localhost:3000/members/1 -X DELETE

// $ curl http://localhost:3000/members
// [{"id":2,"name":"Takahashi"}]
