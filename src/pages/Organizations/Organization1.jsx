import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import NavBar from "../../components/NavBar";

const Organization1 = () => {
  return (
    <>
      <NavBar />
      <Container className="my-5">
        <h1 className="text-center">National Domestic Violence Hotline</h1>
        <Row className="my-3 align-items-center">
          <Col md={6}>
            <img
              src="https://www.thehotline.org/wp-content/themes/hotline-main/assets/images/logo-ndvh.svg"
              alt="National Domestic Violence Hotline Logo"
              className="img-fluid rounded"
            />
          </Col>
          <Col className="text-center"  md={6}>
            <Card body className="shadow-sm">
              <p>Location: Online</p>
              <p>Services: Counseling, Support Groups</p>
              <p>Time: 24/7</p>
              <p>Online Availability: Yes</p>
              <p>Target Demographic: Survivors of Domestic Violence</p>
            </Card>
          </Col>
        </Row>
        <Row className="my-3">
          <Col className="text-center" md={6}>
            <h3>Related Events</h3>
            <Button href="/">All Organization Events</Button>
            <p>
              <strong>More Info:</strong>{" "}
              <a href="https://www.thehotline.org/">National Domestic Violence Hotline Events</a>
            </p>
          </Col>
          <Col className="text-center" md={6}>
            <h3>Related Resources</h3>
            <Button href="/">All Organization Resources</Button>
            <p>
              <strong>More Info:</strong>{" "}
              <a href="https://www.thehotline.org/get-help/">National Domestic Violence Hotline Resources</a>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Organization1;
