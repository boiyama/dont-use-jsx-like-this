import React from "react";

const Component = () => (
  <div id="container">
    <h1>Heading</h1>
    <p>Paragraph</p>
  </div>
);

// $ npx babel 5.js
// import React from "react";

// const Component = () => React.createElement("div", {
//   id: "container"
// }, React.createElement("h1", null, "Heading"), React.createElement("p", null, "Paragraph"));
