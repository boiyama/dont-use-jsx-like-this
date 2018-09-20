import React from "react";

const Component = ({ id }) => (
  <div id={id}>
    <h1>Heading</h1>
    <p>{id}</p>
  </div>
);

// $ npx babel 6.js
// import React from "react";

// const Component = ({
//   id
// }) => React.createElement("div", {
//   id: id
// }, React.createElement("h1", null, "Heading"), React.createElement("p", null, id));
