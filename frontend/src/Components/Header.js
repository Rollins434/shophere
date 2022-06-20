import React from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux'
import { logout } from '../actions/userAction';

function Header() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.userLogin)
  const {userInfo} = user

  const logoutHandler = () => {
    dispatch(logout())
  }
  return(

    <>
    <Navbar bg="dark" variant="dark" expand="lg">
  <Container>
      <LinkContainer to="/">
    <Navbar.Brand >Digi-Outlet</Navbar.Brand>
      </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
      <LinkContainer to="/cart">
        <Nav.Link><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
        </LinkContainer>
        {
          userInfo && userInfo ? (
            <NavDropdown title={userInfo.name} id="username">
            <LinkContainer to="/profile">
            <NavDropdown.Item>Profile</NavDropdown.Item>
            </LinkContainer>
          <NavDropdown.Item onClick={logoutHandler}>
            Logout
          </NavDropdown.Item>
          </NavDropdown>
          ) :
          <LinkContainer to="/login">
          <Nav.Link href="/login"><i className='fas fa-user'></i> Login</Nav.Link>
          </LinkContainer>

            
          
        }
          
     
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    </>
  )
}

export default Header;
