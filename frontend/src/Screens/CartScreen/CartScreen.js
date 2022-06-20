import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  ListGroupItem,
  FormControl,
} from "react-bootstrap";
import { addToCart,removeFromCart } from "../../actions/cartAction";
import { useParams, useNavigate, useLocation } from "react-router";

function CartScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  // console.log(qty);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  // console.log(cartItems);

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, qty, id]);


  const removeFromCartHandler = (id) => {
   console.log(id)
   dispatch(removeFromCart(id))
  
  };

 const checkOutHandler =() => {
  navigate('/login?redirect=shipping')
 }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 || cartItems.qty === 0 ? (
          <h3>
            Your cart is empty <Link to="/">Go back</Link>
          </h3>
        ) : (
          <ListGroup>
            {cartItems.map((data, index) => {
              return (
                <ListGroupItem key={index}>
                  <Row>
                    <Col md={2}>
                      <Image src={data.image} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${data.product}`}>{data.name}</Link>
                    </Col>
                    <Col md={2}>${data.price}</Col>
                    <Col md={2}>
                      <FormControl
                        as="select"
                        value={data.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(data.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(data.countInStocks).keys()].map((x) => (
                          <option key={x + 1} value={x}>
                            {x}
                          </option>
                        ))}
                      </FormControl>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(data.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h1>
                Subtotal {""}
                ({cartItems.reduce((acc, data) => acc +  data.qty,0)}) items
              </h1>
              ${
                cartItems.reduce((acc,data) => acc + data.qty * data.price , 0).toFixed(2)
              }
            </ListGroupItem>
            <ListGroupItem>
              <Button type="button" className="btn-block" onClick={() => checkOutHandler()} disabled = {cartItems.length === 0}>
                Proceed to Checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
