import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Event1 = () => {
  return (
    <Container className="my-5">
      <h1>Volunteer Information Session</h1>
      <Row className="my-3">
          <img
            src="event1.png"
            alt="SAFE Alliance Logo"
            className="img-fluid rounded"
          />
      </Row>
      <Row className="my-3">
          <p>Location: 1515 Grove Blvd, Austin, TX 78741</p>
          <p>Date: October 1, 2025</p>
          <p>Time: 6:00 pm - 7:30 pm</p>
          <p>Event Type: Informational</p>
          <p>
            <strong>Organizer:</strong> The SAFE Alliance
          </p>
          <Button href="/">Organization Info</Button>
          <p>
            <strong>More Info:</strong>{" "}
            <a href="https://www.safeaustin.org/">SAFE Alliance</a>
          </p>
      </Row>
      <Row className="my-4">
          <h3>Related Resources</h3>
      </Row>
    </Container>
  );
};

export default Event1;
