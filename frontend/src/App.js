import React from 'react';
import { Container } from 'react-bootstrap';
import { Routes,Route } from 'react-router';
import { Footer } from './Components/Footer';
import Header from './Components/Header';
import CartScreen from './Screens/CartScreen/CartScreen';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import LoginScreen from '../src/Screens/LoginScreen'
import ProductScreen from './Screens/Product/ProductScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ShippingScreen from "./Screens/ShippingScreen"
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';

function App() {
  return (
    <>
    <Header/>
    <main className="py-3">
    <Container>
      <Routes>
        <Route path="/" exact element={<HomeScreen/>}/>
        <Route path="/login"  element={<LoginScreen/>}/>
        <Route path="/register"  element={<RegisterScreen />}/>
        <Route path="/profile"  element={<ProfileScreen />}/>
        <Route path="/product/:id" element={<ProductScreen/>}/>
        <Route path="/cart/:id" element={<CartScreen/>}/>
        <Route path="/cart" element={<CartScreen/>} exact/>
        <Route path="/shipping" element={<ShippingScreen/>} />
        <Route path="/payment" element={<PaymentScreen/>} />
        <Route path="/placeorder" element={<PlaceOrderScreen/>} />
      </Routes>
      
    </Container>

    </main>
    <Footer/>
    </>
  )
}

export default App;
