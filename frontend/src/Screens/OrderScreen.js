import React from "react";
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
  Container,
} from "react-bootstrap";
import { getOrderDetails } from "../actions/orderAction";

import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Loader from "../Components/loader";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  React.useEffect(() => {
    dispatch(getOrderDetails(id));
  }, []);

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Container>
            <div style={{maxWidth:"80vw",margin:"0 auto"}}>

               <h2>OrderId: {id}</h2>
          <p>
            <strong>Name: </strong> {order.user.name}
          </p>
          <p>
            <strong>Email: </strong>{" "}
            <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
          </p>
            </div>
        <Row>
         
          <Col md={8}>
         
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>Shipping</h2>
                <p>
                  <span style={{ fontWeight: "700" }}>Address:</span>
                  {order.shippingAddress.address},{order.shippingAddress.city},
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country},
                </p>
                {order.isDelivered ? (
                <Alert variant='success'>
                  Delivered on {order.deliveredAt}
                </Alert>
              ) : (
                <Alert variant='danger'>Not Delivered</Alert>
              )}
              </ListGroupItem>
              <ListGroupItem>
                <h2>Payment Method</h2>
                <span style={{ fontWeight: "700" }}>Method:</span>
               <p> {order.paymentMethod}</p>
               {order.isPaid ? (
                <Alert variant='success'>Paid on {order.paidAt}</Alert>
              ) : (
                <Alert variant='danger'>Not Paid</Alert>
              )}
              </ListGroupItem>
              <ListGroupItem>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Alert>Order is Empty</Alert>
                ) : (
                  <ListGroup variant="flush">
                    {order.orderItems.map((item, index) => {
                      return (
                        <React.Fragment key={index}>
                          {" "}
                          <ListGroupItem>
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
                                {item.qty} x ${item.price} = $
                                {item.qty * item.price}
                              </Col>
                            </Row>
                          </ListGroupItem>
                        </React.Fragment>
                      );
                    })}
                  </ListGroup>
                )}
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <h2>Order Summary</h2>
                <ListGroupItem>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Total</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        </Container>
      )}
    </>
  );
};
export default OrderScreen;
