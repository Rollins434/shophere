import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';

export const Footer = () => {
  return (
      <>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                Copyright &copy; ShopC
                </Col>
            </Row>
        </Container>
      </>
  )
};
