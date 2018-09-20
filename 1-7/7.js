import React from "react";

const Child = ({ id }) => (
  <div id={id}>
    <h1>Heading</h1>
    <p>{id}</p>
  </div>
);

const Parent = () => <Child id="child" />;

// $ npx babel 7.js
// import React from "react";

// const Child = ({
//   id
// }) => React.createElement("div", {
//   id: id
// }, React.createElement("h1", null, "Heading"), React.createElement("p", null, id));

// const Parent = () => React.createElement(Child, {
//   id: "child"
// });
