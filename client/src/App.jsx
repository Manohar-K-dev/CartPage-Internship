import { Routes, Route } from "react-router-dom";
// pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Profile from "./pages/Profile.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
};

export default App;
