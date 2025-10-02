import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import NavBar from "../../components/NavBar";

const Organization2 = () => {
  return (
    <>
      <NavBar />
      <Container className="my-5">
        <h1 className="text-center">Hope Alliance</h1>
        <Row className="my-3 align-items-center">
          <Col md={6}>
            <img
              src="https://www.hopealliancetx.org/wp-content/uploads/HopeAlliance_Logo_color_tagline-1-300x300.png"
              alt="Hope Alliance Logo"
              className="img-fluid rounded"
            />
          </Col>
          <Col className="text-center" md={6}>
            <Card body className="shadow-sm">
              <p>Location: 1011 Gattis School Rd, Ste 110 Round Rock, TX 78664</p>
              <p>Services: Emergency Shelter, Counseling, Legal Advocacy</p>
              <p>
                Time: <br />
                Monday 12:00 am - 4:00 pm <br />
                Tuesday 12:00 am - 4:00 pm <br />
                Wednesday 12:00 am - 4:00 pm <br />
                Thursday 12:00 am - 4:00 pm <br />
                Friday CLOSED <br />
                Saturday CLOSED <br />
                Sunday CLOSED
              </p>
              <p>Online Availability: Yes</p>
              <p>
                Target Demographic: Survivors of Domestic Violence and Sexual
                Assault
              </p>
            </Card>
          </Col>
        </Row>
        <Row className="my-3">
          <Col className="text-center" md={6}>
            <h3>Related Events</h3>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="https://www.hopealliancetx.org/wp-content/uploads/HopeAlliance_Logo_color_tagline-1-300x300.png" />
              <Card.Body>
                <Card.Title>Hope Alliance Survive. Thrive. Prevent 5K Run/Walk</Card.Title>
                <Card.Text>Location: 445 E Morrow St, Georgetown, TX 78626 (San Gabriel Park)</Card.Text>
                <Card.Text>Time: 9:00 am - 12:00 pm</Card.Text>
                <Card.Text>Date: October 11, 2025</Card.Text>
                <Card.Text>Event Type: Fundraising</Card.Text>
                <Card.Text>Organization: Hope Alliance</Card.Text>
                <Button
                  style={{
                    color: "black",
                    backgroundColor: "#cde5d7",
                    borderColor: "black",
                  }}
                  href="/event2"
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
                            src="https://www.hopealliancetx.org/wp-content/uploads/HopeAlliance_Logo_color_tagline-1-300x300.png"
                          />
                          <Card.Body>
                            <Card.Title>24-Hour HOPELine</Card.Title>
                            <p>
                            Location: 1-800-460-7233
                          </p>
                          <p>Type: Hotline</p>
                          <p>Hours: 24/7</p>
                          <p>Online Availability: Yes</p>
                            <Button
                              style={{
                                color: "black",
                                backgroundColor: "#cde5d7",
                                borderColor: "black",
                              }}
                              href="/resource2"
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

export default Organization2;
