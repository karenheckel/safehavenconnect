import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import NavBar from "../../components/NavBar";

const Organization1 = () => {
  return (
    <>
      <NavBar />
      <Container className="my-5">
        <h1 className="text-center">Volunteer Information Session</h1>
        <Row className="my-3 align-items-center">
          <Col md={6}>
            <img
              src="https://www.safeaustin.org/wp-content/uploads/2018/08/fb.png"
              alt="SAFE Alliance Logo"
              className="img-fluid rounded"
            />
          </Col>
          <Col className="text-center"  md={6}>
            <Card body className="shadow-sm">
              <p>Location: 1515 Grove Blvd, Austin, TX 78741</p>
              <p>Date: October 1, 2025</p>
              <p>Time: 6:00 pm - 7:30 pm</p>
              <p>Event Type: Informational</p>
            </Card>
          </Col>
        </Row>
        <Row className="my-3">
          <Col className="text-center" md={6}>
            <h3>Related Organizations</h3>
            <p>
              <strong>Organizer:</strong> The SAFE Alliance
            </p>
            <Button href="/">Organization Info</Button>
            <p>
              <strong>More Info:</strong>{" "}
              <a href="https://www.safeaustin.org/">SAFE Alliance</a>
            </p>
          </Col>
          <Col className="text-center" md={6}>
            <h3>Related Resources</h3>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Organization1;
