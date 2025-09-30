import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import NavBar from "../../components/NavBar";

const Event3 = () => {
  return (
    <>
      <NavBar />
      <Container className="my-5">
        <h1 className="text-center">TCFV’s 2025 Texas Town Hall</h1>
        <Row className="my-3 align-items-center">
          <Col md={6}>
            <img
              src="https://tcfv.org/wp-content/themes/tcfv/assets/img/logo.svg"
              alt="tcfv logo"
              className="img-fluid rounded"
            />
          </Col>
          <Col className="text-center"  md={6}>
            <Card body className="shadow-sm">
              <p>Location: Texas Tribune Headquarters, Austin</p>
              <p>Date: October 3, 2025</p>
              <p>Time: 10:00 am - 12:00 pm</p>
              <p>Event Type: Panel</p>
            </Card>
          </Col>
        </Row>
        <Row className="my-3">
          <Col className="text-center" md={6}>
            <h3>Related Organizations</h3>
            <p>
              <strong>Organizer:</strong> tcfv (Texas Council on Family Violence)
            </p>
            <Button href="/">Organization Info</Button>
            <p>
              <strong>More Info:</strong>{" "}
              <a href="https://tcfv.org/">tcfv</a>
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

export default Event3;