import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import Home from "./Pages/Home.jsx";
import Shop from "./Pages/Shop.jsx";
import Item from "./Pages/Item.jsx";


const App = () =>{
  return(
  <Router>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Shop' element={<Shop /> } />
          <Route path='/Shop/Item/:id/:productName' element={<Item /> } />

      </Routes>
  </Router>
  )
}





export default App;