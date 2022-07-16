import React, { useState } from "react";
import {useDispatch,useSelector} from 'react-redux';
import {  Button, Form } from "react-bootstrap";
import FormContainer from "../Components/FormContainer";
import {   useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartAction";
import CheckoutSteps from "../Components/CheckoutSteps"

const ShippingScreen = () =>{

  const navigate = useNavigate()

  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const {shippingAddress} = cart

  const [address,setAddress] = useState(shippingAddress.address)
  
  const [city,setCity] = useState(shippingAddress.city)
  
  const [postalCode,setPostalCode] = useState(shippingAddress.postalCode)
  
  const [country,setCountry] = useState(shippingAddress.country)


  const handleSubmit = (e) =>{
e.preventDefault();
    dispatch(saveShippingAddress({
      address,city,postalCode,country
    }))
    navigate('/payment')
  }
  return(
  <FormContainer>
    <CheckoutSteps step1 step2 />
    <h1>Shipping</h1>
    <Form onSubmit={handleSubmit}>
    <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="postalcode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="Country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>

          </Form.Group>
          <Button type="submit" variant="outline-dark" className="mx-auto mt-4" style={{display:"block"}}>Continue</Button>
        
    </Form>
  </FormContainer>

  )
}

export default ShippingScreen