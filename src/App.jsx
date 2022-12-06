import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import { SignIn, SignUp } from "./common";
import { Checkout, Fundraiser, ProjectDetails, ProjectList, StartFundraising } from "./pages/components";
import Home from "./pages/Home";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';


function App() {
  return (
    <PayPalScriptProvider options={{"client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID}}>
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
          </Route>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/create/fundraiser/regform' element={<StartFundraising />} />
        </Routes>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}

export default App;