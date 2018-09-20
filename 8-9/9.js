import { h } from "hyperapp";

const Child = ({ id }) => (
  <div id={id}>
    <h1>Heading</h1>
    <p>{id}</p>
  </div>
);

const Parent = () => <Child id="child" />;

// $ npx babel 9.js
// import { h } from "hyperapp";

// const Child = ({
//   id
// }) => h("div", {
//   id: id
// }, h("h1", null, "Heading"), h("p", null, id));

// const Parent = () => h(Child, {
//   id: "child"
// });
