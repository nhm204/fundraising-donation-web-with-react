import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import { ProjectList } from "./pages/components";
import Home from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path="/discover">
          <Route index element={<ProjectList />} /> 
          {/* <Route path=':name/:id' element={<ProductDetail />} /> */}
        </Route>
        {/* <Route path="/create" element={<Owner />} />
        <Route path="/checkout/" element={<CheckOut />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;