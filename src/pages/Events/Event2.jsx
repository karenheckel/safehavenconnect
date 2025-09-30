import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import NavBar from "../../components/NavBar";

const Event2 = () => {
  return (
    <>
      <NavBar />
      <Container className="my-5">
        <h1 className="text-center">Understanding Domestic Abuse and the Impact on Children and
        Families</h1>
        <Row className="my-3 align-items-center">
          <Col md={6}>
            <img
              src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1081174993%2F249324158147%2F1%2Foriginal.20250725-115152?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=295%2C0%2C792%2C396&s=50166504b332a1ee1f268b31b16442fa"
              alt="SAFE Alliance Logo"
              className="img-fluid rounded"
            />
          </Col>
          <Col className="text-center"  md={6}>
            <Card body className="shadow-sm">
              <p>Location: Online</p>
              <p>Date: October 9, 2025</p>
              <p>Time: 10:30 am - 11:30 am</p>
              <p>Event Type: Informational</p>
            </Card>
          </Col>
        </Row>
        <Row className="my-3">
          <Col className="text-center" md={6}>
            <h3>Related Organizations</h3>
            <p>
              <strong>Organizer:</strong> Adele Gladman & Associates
            </p>
            <Button href="/">Organization Info</Button>
            <p>
              <strong>More Info:</strong>{" "}
              <a href="https://www.adelegladman.co.uk/">Adele Gladman & Associates</a>
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

export default Event2;
