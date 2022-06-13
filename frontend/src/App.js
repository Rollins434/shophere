import React from 'react';
import { Container } from 'react-bootstrap';
import { Routes,Route } from 'react-router';
import { Footer } from './Components/Footer';
import Header from './Components/Header';
import CartScreen from './Screens/CartScreen/CartScreen';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import ProductScreen from './Screens/Product/ProductScreen';


function App() {
  return (
    <>
    <Header/>
    <main className="py-3">
    <Container>
      <Routes>
        <Route path="/" exact element={<HomeScreen/>}/>
        <Route path="/product/:id" element={<ProductScreen/>}/>
        <Route path="/cart/:id" element={<CartScreen/>}/>
      </Routes>
      
    </Container>

    </main>
    <Footer/>
    </>
  )
}

export default App;
