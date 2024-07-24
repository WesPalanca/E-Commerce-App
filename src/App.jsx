import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import Home from "./Pages/Home.jsx";
import Shop from "./Pages/Shop.jsx";
import Item from "./Pages/Item.jsx";
import Wishlist from "./Pages/Wishlist.jsx";


const App = () =>{
  return(
  <Router>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Shop' element={<Shop /> } />
          <Route path='/Shop/Item/:id/:productName' element={<Item /> } />
          <Route path='/Wishlist' element={<Wishlist />} />

      </Routes>
  </Router>
  )
}





export default App;