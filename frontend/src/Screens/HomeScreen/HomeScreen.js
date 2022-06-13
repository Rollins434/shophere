import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../../Components/Product";

import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productAction";
import Loader from "../../Components/loader";

function HomeScreen() {
  

  const dispatch = useDispatch()
  const productList =  useSelector(state => state.productList)
  const {loading,error,products,} = productList
  useEffect(()=>{
  
    dispatch(listProducts())
  },[dispatch])

  

  

  return (
    <>
      <h1>Products</h1>
      {
        loading ? <Loader/> : error ? <h5>{error}</h5> : 
      
      <Row>
        {products.map((product,index) => {
          return (
            <React.Fragment key={index}>
              <Col sm={12} md={6} lg={4}>
                  
                <Product product={product} />
              </Col>
            </React.Fragment>
          );
        })}
      </Row>
}
    </>
  );
}

export default HomeScreen;
