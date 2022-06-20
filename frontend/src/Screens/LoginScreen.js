import React from "react";
import { Link,  useLocation, useNavigate } from "react-router-dom";
import {  Button, Row, Col, Form, Alert } from "react-bootstrap";
import FormContainer from "../Components/FormContainer";
import Loader from "../Components/loader"
import { Login } from "../actions/userAction";
import { useDispatch,useSelector } from "react-redux";

function LoginScreen() {
    const location = useLocation();
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const user = useSelector(state => state.userLogin)
    
    const {loading,error,userInfo} = user

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const redirect = location.search ? location.search.split('=')[1] : '/'


  React.useEffect(() =>{
    if(userInfo){
      navigate(redirect)
    }
  },[userInfo,redirect,navigate])

  const submitHandler = (e) =>{
    e.preventDefault()
    
    dispatch(Login(email,password))
  }
  return (
    <>
      <FormContainer>
        <h1>Sign In</h1>
        {
            error && <Alert variant="danger">{error.message}</Alert>
        }
        {
            loading && <Loader/>
        }
        
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
                Sign In
          </Button>
        </Form>
        <Row className="py-3">
        <Col>New Customer ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link></Col>
        </Row>
      </FormContainer>
    </>
  );
}

export default LoginScreen;
