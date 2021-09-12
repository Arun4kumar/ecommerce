import React, { useRef, useState, useEffect } from "react";
import { getProfile } from "../actions/userActions";
import Loader from "../components/Loader";
import { updateUser } from "../actions/userActions";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import { listMyOrders } from "../actions/orderAction";
import { Row, Col, Form, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { profileInfo, error, loading } = useSelector((state) => state.profile);
  const orderMyList = useSelector((state) => state.orderMyList);
  const {
    loading: loadingOrders,
    error: errorOrder,
    order: orders,
  } = orderMyList;
  const [email, setEmail] = useState(profileInfo.email);
  const [name, setName] = useState(profileInfo.name);
  const [info, setInfo] = useState(null);
  const [password, setPassword] = useState();
  const [conformPassword, setConformPassword] = useState();

  useEffect(() => {
    dispatch(getProfile("profile"));
    dispatch(listMyOrders());
  }, [info, dispatch]);
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (conformPassword !== password) {
      setInfo("Password do not match");
      return;
    }
    setInfo(null);

    dispatch(
      updateUser({
        name: name ? name : profileInfo.name,
        email: email ? email : profileInfo.email,
        password: password ? password : profileInfo.password,
      })
    );
    setInfo("Profile Updated");
  };

  return (
    <Row className="my-3">
      {loading && <Loader />}
      <Col md={3}>
        <h3>Profile Update</h3>
        {info && <Message variant="success">{info}</Message>}

        {error && <Message variant="error">{error}</Message>}
        <Form onSubmit={formSubmitHandler}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter Username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="conformPassword">
            <Form.Label>Conform Password</Form.Label>
            <Form.Control
              onChange={(e) => setConformPassword(e.target.value)}
              type="password"
              placeholder="Conform Password"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update Profile
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrder ? (
          <Message variant="danget">{errorOrder}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          style={{ color: "red" }}
                          className="fas fa-times-circle"
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          style={{ color: "red" }}
                          className="fas fa-times-circle"
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order.id}`}>
                        <Button className="btn btn-sm" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
