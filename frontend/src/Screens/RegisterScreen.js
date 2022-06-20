import React from "react";
import { Link,  useLocation, useNavigate } from "react-router-dom";
import {  Button, Row, Col, Form, Alert } from "react-bootstrap";
import FormContainer from "../Components/FormContainer";
import Loader from "../Components/loader"
import { Register } from "../actions/userAction";
import { useDispatch,useSelector } from "react-redux";

function RegisterScreen() {
    const location = useLocation();
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    
    const {loading,error,userInfo} = userRegister

    const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setconfirmPassword] = React.useState("");
  const [message, setMessage] = React.useState(null);

  const redirect = location.search ? location.search.split('=')[1] : '/'


  React.useEffect(() =>{
    if(userInfo){
      navigate(redirect)
    }
  },[userInfo,redirect,navigate])

  const submitHandler = (e) =>{
    e.preventDefault()
    if(password !== confirmPassword){
        setMessage('passwords do not match')
    }else{

        dispatch(Register(name,email,password))
    }
  }
  return (
    <>
      <FormContainer>
        <h1>Sign Up</h1>
        {
            message && <Alert variant="danger">{message}</Alert>
        }
        {
            error && <Alert variant="danger">{error}</Alert>
        }
        {
            loading && <Loader/>
        }
        
        <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
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

          <Form.Group controlId="confirm password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="my-3">
                Resgister
          </Button>
        </Form>
        <Row className="py-3">
        <Col>Have an Account ? <Link to={redirect ? `/login?redirect=${redirect}` : '/register'}>Login</Link></Col>
        </Row>
      </FormContainer>
    </>
  );
}

export default RegisterScreen;
