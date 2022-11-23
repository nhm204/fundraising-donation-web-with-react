import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import { SignIn, SignUp } from "./common";
import { Checkout, Fundraiser, ProjectDetails, ProjectList } from "./pages/components";
import Home from "./pages/Home";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';


function App() {
  return (
    <PayPalScriptProvider options={{"client-id": 'AVESVPc9p3s6GV-ME57Aa_mFJMOvwrDn3K679X7U86pZr9b3remed-0QpYCoBj9IlBsQtA5Xw1S3hVxz'}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path="/discover">
            <Route index element={<ProjectList />} /> 
            <Route path=':name/:id' element={<ProjectDetails />} />
            <Route path=':name/:id/donate' element={<Checkout />} />
          </Route>
          <Route path="/fundraiser">
            <Route path=':name/:id' element={<Fundraiser />} />
            <Route path=':name/:id/edit' element={<Fundraiser />} />
          </Route>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}

export default App;