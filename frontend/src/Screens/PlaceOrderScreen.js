import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Alert,
  ListGroupItem,
} from "react-bootstrap";
import CheckoutSteps from "../Components/CheckoutSteps";
import { Link } from "react-router-dom";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <span style={{ fontWeight: "700" }}>Address:</span>
                {cart.shippingAddress.address},{cart.shippingAddress.city},
                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
                ,
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Method</h2>
              <span style={{ fontWeight: "700" }}>Method:</span>
              {cart.paymentMethod}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Alert>Your Cart is Empty</Alert>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => {
                    <ListGroupItem key="index">
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                           {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroupItem>;
                  })}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};
export default PlaceOrderScreen;
