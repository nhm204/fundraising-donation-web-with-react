import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Discover from "./pages/components/Discover/Discover";
import Home from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path="/discover">
          <Route index element={<Discover />} /> 
          {/* <Route path=':name/:id' element={<ProductDetail />} /> */}
        </Route>
        {/* <Route path="/owner" element={<Owner />} />
        <Route path="/checkout/" element={<CheckOut />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;