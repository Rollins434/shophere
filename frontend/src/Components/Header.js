import React from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import { Container, Nav, Navbar } from 'react-bootstrap';

function Header() {
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
        <LinkContainer to="/login">
        <Nav.Link href="/login"><i className='fas fa-user'></i> Login</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    </>
  )
}

export default Header;
