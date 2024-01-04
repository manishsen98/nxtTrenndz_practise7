
import React from 'react';
import { BrowserRouter, Routes ,Route, } from 'react-router-dom';
import Register from './components/Register';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Product from './components/Product';
import Cart from './components/Cart';
import Error from './components/Error';
import "./components/PrivateComponents"


import './App.css';
import PrivateComponent from './components/PrivateComponents';
import AddProducts from './components/AddProducts';

const App = () => {
  return (
    <BrowserRouter>
       <Routes>
        <Route element = {<PrivateComponent />  } >
        <Route  path="/" element  = { <Home/>  } />
        <Route  path="/products" element  ={ <Product/> } />
        <Route  path="/cart" element = { <Cart/>  } />
        </Route>
        <Route  path="/register" element = {<Register/> } />
        <Route  path="/login" element = { <LoginForm/> } />
        <Route  path="/addproducts" element = { <AddProducts/> } />
        <Route  path="*" element = { <Error/>  } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
