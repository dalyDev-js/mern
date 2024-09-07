import "./App.css";
import { Navbar } from "./components/Navbar";
import Cursor from "./hooks/Cursor";
import { Landing } from "./pages/Landing";

function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <Landing />
    </>
  );
}

export default App;
