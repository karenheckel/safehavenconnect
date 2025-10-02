import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import NavBar from "../../components/NavBar";

const Organization3 = () => {
  return (
    <>
      <NavBar />
      <Container className="my-5">
        <h1 className="text-center">Texas Council on Family Violence</h1>
        <Row className="my-3 align-items-center">
          <Col md={6}>
            <img
              src="https://tcfv.org/wp-content/themes/tcfv/assets/img/logo.svg"
              alt="Texas Council on Family Violence Logo"
              className="img-fluid rounded"
            />
          </Col>
          <Col className="text-center" md={6}>
            <Card body className="shadow-sm">
              <p>Location: PO Box 163865, Austin, TX 78716</p>
              <p>Services: Trainings, Technical Assistance, Materials, Prevention Efforts</p>
              <p>Hours: N/A</p>
              <p>Online Availability: Yes</p>
              <p>Target Users: Family Violence Programs and Advocates</p>
            </Card>
          </Col>
        </Row>
        <Row className="my-3">
          <Col className="text-center" md={6}>
            <h3>Related Events</h3>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://tcfv.org/wp-content/themes/tcfv/assets/img/logo.svg"
              />
              <Card.Body>
                <Card.Title>TCFV’s 2025 Texas Town Hall</Card.Title>
                <Card.Text>
                  Location: Texas Tribune Headquarters, Austin, TX
                </Card.Text>
                <Card.Text>Time: 10:00 am - 12:00 pm</Card.Text>
                <Card.Text>Date:October 3, 2025</Card.Text>
                <Card.Text>Event Type: Panel</Card.Text>
                <Card.Text>
                  Organization: Texas Council on Family Violence
                </Card.Text>
                <Button
                  style={{
                    color: "black",
                    backgroundColor: "#cde5d7",
                    borderColor: "black",
                  }}
                  href="/event3"
                >
                  View Event
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col className="text-center" md={6}>
            <h3>Related Resources</h3>
            <Card style={{ width: "18rem" }}>
                          <Card.Img
                            variant="top"
                            src="https://tcfv.org/wp-content/themes/tcfv/assets/img/logo.svg"
                          />
                          <Card.Body>
                            <Card.Title>Texas Council on Family Violence</Card.Title>
                            <p>Location: https://tcfv.org/awareness/</p>
                          <p>Type: Informational</p>
                          <p>Hours: N/A</p>
                          <p>Organization: Texas Council on Family Violence</p>
                          <p>Online Availability: Yes</p>
                            <Button
                              style={{
                                color: "black",
                                backgroundColor: "#cde5d7",
                                borderColor: "black",
                              }}
                              href="/resource3"
                            >
                              View Resource
                            </Button>
                          </Card.Body>
                        </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Organization3;
