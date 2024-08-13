import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import Home from "./Pages/Home.jsx";
import Shop from "./Pages/Shop.jsx";
import Item from "./Pages/Item.jsx";
import Wishlist from "./Pages/Wishlist.jsx";
import Checkout from "./Pages/Checkout.jsx";
import Cart from "./Pages/Cart.jsx";

const App = () =>{
  return(
  <Router>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Shop' element={<Shop /> } />
          <Route path='/Item/:id/:productName' element={<Item /> } />
          <Route path='/Wishlist' element={<Wishlist />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path='/Checkout' element={<Checkout />} />
          <Route path="/Checkout/:productId" element={<Checkout />} />

      </Routes>
  </Router>
  )
}





export default App;