import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Col } from "react-bootstrap";
import FormContainer from "../Components/FormContainer";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartAction";
import CheckoutSteps from "../Components/CheckoutSteps";

const PaymentScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label style={{border:"1px solid #ccc",display:"block",padding:"1rem",fontSize:"1.4rem",borderRadius:"15px"}}>Select Method</Form.Label>
      
        <Col>
          <Form.Check
            type="radio"
            label="PayPal or Credit Card"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Col>
        </Form.Group>
        <Button
          type="submit"
          variant="outline-dark"
          className="mx-auto mt-4"
          style={{ display: "block" }}
        >
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
