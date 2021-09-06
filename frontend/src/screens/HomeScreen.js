import React, { useEffect } from "react";
import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";
import { getProducts } from "../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <>
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          products.map((item) => {
            return (
              <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={item} />
              </Col>
            );
          })
        )}
      </Row>
    </>
  );
};

export default HomeScreen;
