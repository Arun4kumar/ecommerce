import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { _id, name, image, rating, numReviews, price } = props.product;
  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={`/products/${_id}`}>
          <Card.Img src={image} variant="top" />
        </Link>

        <Card.Body>
          <Link to={`/products/${_id}`}>
            <Card.Title as="h5">{name}</Card.Title>
          </Link>
          <Card.Text as="div">
            <div className="my-3">
              <span>
                <Rating rating={rating} />
              </span>{" "}
              from {numReviews} reviews
            </div>
          </Card.Text>
          <Card.Text as="h3">${price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
