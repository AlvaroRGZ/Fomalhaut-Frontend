import './App.css';
import TopPanel from './components/TopPanel/TopPanel';
import Home from './components/Home/Home';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSatelliteDish, faSatellite } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Routes and Route for routing

// Add FontAwesome icons to the library
library.add(faSatelliteDish, faSatellite);

function App() {
  return (
    <BrowserRouter>
      <TopPanel />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
