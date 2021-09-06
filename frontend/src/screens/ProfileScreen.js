import React, { useRef, useState, useEffect } from "react";
import { getProfile } from "../actions/userActions";
import Loader from "../components/Loader";
import { updateUser } from "../actions/userActions";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";

const ProfileScreen = (history, location) => {
  const dispatch = useDispatch();
  const { profileInfo, error, loading } = useSelector((state) => state.profile);
  const [email, setEmail] = useState(profileInfo.email);
  const [name, setName] = useState(profileInfo.name);
  const [info, setInfo] = useState(null);
  const [password, setPassword] = useState();
  const [conformPassword, setConformPassword] = useState();

  useEffect(() => {
    dispatch(getProfile("profile"));
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
      <Col md={9}>My Orders</Col>
    </Row>
  );
};

export default ProfileScreen;
