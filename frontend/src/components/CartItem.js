import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartAddAction, cartRemoveAction } from "../actions/cartActions.js";
import { Row, Form, Button, Container, Col, Image } from "react-bootstrap";
import { useRef } from "react";

const CartItem = (props) => {
  const temp = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  const { name, image, qty, price, countInStock, _id } = props.product;

  const addToCart = () => {
    dispatch(cartAddAction({ id: _id, qty: temp.current.value }));
    history.push("/cart");
  };
  const removeFromCartHandler = () => {
    dispatch(cartRemoveAction({ id: _id }));
  };

  return (
    <Container>
      <Row>
        <Col md={2}>
          <Image src={image} rounded fluid alt={name} />
        </Col>
        <Col md={3}>
          <Link to={`/products/${_id}`}>
            <h4>{name}</h4>
          </Link>
        </Col>
        <Col md={2}>
          <h4>{price}</h4>
        </Col>
        <Col md={2}>
          <Form.Control
            as="select"
            variant="light"
            ref={temp}
            defaultValue={qty}
            onChange={(e) => addToCart()}
          >
            {[...Array(countInStock).keys()].map((key) => (
              <option key={key + 1} value={key + 1}>
                {key + 1}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col md={2}>
          <Button type="button" variant="light" onClick={removeFromCartHandler}>
            <i className="fas fa-trash"></i>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CartItem;
