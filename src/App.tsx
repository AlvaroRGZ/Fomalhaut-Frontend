import "./App.css";
import TopPanel from "./components/TopPanel/TopPanel";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SidePanel from "./components/SidePanel/SidePanel";

function App() {
  return (
    <BrowserRouter>
      <TopPanel />
      <div className="App">
        <SidePanel />
        <div className="App-body">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
