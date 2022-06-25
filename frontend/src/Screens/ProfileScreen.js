import React from "react";
import { Link,  useLocation, useNavigate } from "react-router-dom";
import {  Button, Row, Col, Form, Alert } from "react-bootstrap";

import Loader from "../Components/loader"
import { getUserDetail, Register,updateUserProfile } from "../actions/userAction";
import { useDispatch,useSelector } from "react-redux";

function ProfileScreen() {
    const location = useLocation();
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    
    const {loading,error,user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    
    const {success} = userUpdateProfile

    const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setconfirmPassword] = React.useState("");
  const [message, setMessage] = React.useState(null);



  React.useEffect(() =>{
    if(!userInfo){
      navigate('/login')
    }else{
        if(!user?.name){
            dispatch(getUserDetail('profile'))
        }else{
            setName(user.name)
            setEmail(user.email)
        }
    }
  },[dispatch,userInfo,navigate,user])

  const submitHandler = (e) =>{
    e.preventDefault()
    if(password !== confirmPassword){
        setMessage('passwords do not match')
    }else{
      dispatch(updateUserProfile({
        id:user._id,
        name,
        email,
        password
      }))
        

    }
  }
  return (
    <>
     <Row>
        <Col md={3}>
        <h1>User Profile</h1>
        {
            message && <Alert variant="danger">{message}</Alert>
        }
        {
            error && <Alert variant="danger">{error}</Alert>
        }
        {
            success && setTimeout(() => {
              return (
                <Alert variant="success" >Profile Updated</Alert>
              )
            },300)
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
        </Col>
        <Col md={9}>
            My Orders
        </Col>

     </Row>
    </>
  );
}

export default ProfileScreen;
