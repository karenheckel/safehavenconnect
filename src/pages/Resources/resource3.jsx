import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import NavigationBar from "../../components/NavigationBar";

const Resource3 = () => {
  return (
    <>
      <NavigationBar />
      <Container className="my-5">
        <h1 className="text-center">Domestic Violence Awareness Month Resources</h1>
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
              <p>Location: https://tcfv.org/awareness/</p>
              <p>Type: Informational</p>
              <p>Hours: N/A</p>
              <p>Organization: Texas Council on Family Violence</p>
              <p>Online Availability: Yes</p>
            </Card>
          </Col>
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
            <h3>Related Events</h3>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://tcfv.org/wp-content/themes/tcfv/assets/img/logo.svg"
              />
              <Card.Body>
                <p>Location: Texas Tribune Headquarters, Austin</p>
              <p>Date: October 3, 2025</p>
              <p>Time: 10:00 am - 12:00 pm</p>
              <p>Event Type: Panel</p>
              <p>
                <a href="https://tcfv.org/events/texas-town-hall-2025/#">
                Event Link
              </a>
                </p>
                <Button
                  style={{
                    color: "black",
                    backgroundColor: "#cde5d7",
                    borderColor: "black",
                  }}
                  href="/organization1"
                >
                  View Event
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Resource3;
