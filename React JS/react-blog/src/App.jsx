import Login from "./UserComponent";
function App() {
  return (
    <div>
      <h1>Hello React</h1>
      <Fruit />
      <Login />
    </div>
  );
}

function Fruit() {
  return <h1>Apple</h1>;
}

export default App;