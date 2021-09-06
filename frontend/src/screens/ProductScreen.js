import React, { useEffect, useState } from "react";
import { getSingleProduct } from "../actions/productActions.js";
import { useHistory } from "react-router";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Container,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { cartAddAction } from "../actions/cartActions.js";
import Message from "../components/Message";
const ProductScreen = ({ match }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const { loading: another, error: temp } = useSelector((state) => state.cart);
  useEffect(
    () => dispatch(getSingleProduct(match.params.id)),
    [match, dispatch]
  );

  const addToCart = () => {
    dispatch(cartAddAction({ id: product._id, qty }));
    history.push("/cart");
  };

  return (
    <>
      {loading || another ? (
        <Loader />
      ) : error || temp ? (
        <Message>
          {temp}
          {error}
        </Message>
      ) : (
        <Container className="my-3">
          <Link to="/">
            <Button className="btn btn-primary my-3">Go Back</Button>
          </Link>
          <Row>
            <Col md={9}>
              <Row>
                <Col md={6}>
                  <Image src={product.image} fluid />
                </Col>
                <Col md={3}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>{product.name}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Rating rating={product.rating} /> from{" "}
                      {product.numReviews} reviews
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price : </Col>
                        <Col>$ {product.price}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>{product.description}</ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price : </Col>
                      <Col>
                        <strong>$ {product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Stauts : </Col>
                      <Col>
                        {product.countInStock > 0
                          ? "In Stocks"
                          : "Out Of Stocks"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock !== 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty:{product.quantity}</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (key) => (
                                <option key={key + 1} value={key + 1}>
                                  {key + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      onClick={addToCart}
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ProductScreen;
