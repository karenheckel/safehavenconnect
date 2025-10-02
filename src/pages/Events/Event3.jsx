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
          <Col className="text-center" md={6}>
            <Card body className="shadow-sm">
              <p>Location: Texas Tribune Headquarters, Austin</p>
              <p>Date: October 3, 2025</p>
              <p>Time: 10:00 am - 12:00 pm</p>
              <p>Event Type: Panel</p>
              <a href="https://tcfv.org/events/texas-town-hall-2025/#">
                Event Link
              </a>
            </Card>
          </Col>
        </Row>
        <Row>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.793039819381!2d-97.74373242486826!3d30.271477507779117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b5a0aa0df2e7%3A0xc62c8585bc753d48!2sThe%20Texas%20Tribune!5e0!3m2!1sen!2sus!4v1759347405845!5m2!1sen!2sus"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </Row>
        <Row className="my-3">
          <Col className="text-center" md={6}>
            <h3>Related Organizations</h3>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://tcfv.org/wp-content/themes/tcfv/assets/img/logo.svg"
              />
              <Card.Body>
                <Card.Title>Texas Council on Family Violence</Card.Title>
                <Card.Text>Location: PO Box 163865, Austin, TX 78716</Card.Text>
                <Card.Text>
                  Services: Trainings, Technical Assistance, Materials,
                  Prevention Efforts
                </Card.Text>
                <Card.Text>Hours: 24/7</Card.Text>
                <Card.Text>Online Availability: Yes</Card.Text>
                <Card.Text>
                  Target Users: Family Violence Programs and Advocates
                </Card.Text>
                <Button
                  style={{
                    color: "black",
                    backgroundColor: "#cde5d7",
                    borderColor: "black",
                  }}
                  href="/organization3"
                >
                  View Organization
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

export default Event3;
