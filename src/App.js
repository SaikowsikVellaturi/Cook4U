import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import "./App.css";
import NavBar from "./components/navbar/NavBar";
import Details from "./components/Details/Details";
import About from "./components/About/About";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/recipes/:id" element={<Details />} />
          <Route exact path="/about" element={<About />} />

          {/* <Create /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
