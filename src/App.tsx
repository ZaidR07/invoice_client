import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";


const App = () => {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Products" element={<Products />} />


      </Routes>
    </BrowserRouter>
  );
};

export default App;
