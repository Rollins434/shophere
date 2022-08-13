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
} from "react-bootstrap";
import { createOrder } from "../actions/orderAction";
import CheckoutSteps from "../Components/CheckoutSteps";
import { Link,  useNavigate } from "react-router-dom";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const orderCreate = useSelector((state) => state.orderCreate)
  const {order,success,error} = orderCreate
  
  const cart = useSelector((state) => state.cart);
  cart.itemPrice = cart.cartItems.reduce((acc,item) => acc+ item.price * item.qty , 0)
  cart.shippingPrice = cart.itemPrice > 100 ? 0 : 100
  cart.taxPrice = Number((0.15*cart.itemPrice).toFixed(2))
  cart.totalPrice = Number(cart.itemPrice + cart.shippingPrice + cart.taxPrice)

 React.useEffect(() => {
if(success){
  navigate(`/order/${order._id}`)
}
 },[navigate,success])


  const placeOrderHandler = () => {
    // console.log("order");
   
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  };
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
                  {cart.cartItems.map((item,index) => {
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
                  <Col>${cart.itemPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroupItem>
           <ListGroupItem>
           {error && <Alert variant="danger">{error}</Alert>}
           </ListGroupItem>
               <Button
                  type="button"
                className="btn-block"
              
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}

                >
                  Place Order
                </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default PlaceOrderScreen;
