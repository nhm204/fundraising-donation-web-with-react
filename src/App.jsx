import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import SignIn from "./common/SignIn/SignIn";
import { Fundraiser, ProjectDetails, ProjectList } from "./pages/components";
import Home from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path="/discover">
          <Route index element={<ProjectList />} /> 
          <Route path=':name/:id' element={<ProjectDetails />} />
        </Route>
        <Route path="/fundraiser">
          <Route path=':name/:id' element={<Fundraiser />} />
        </Route>
        <Route path='/signin' element={<SignIn />} />

        {/* <Route path="/create" element={<Owner />} />
        <Route path="/checkout/" element={<CheckOut />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;