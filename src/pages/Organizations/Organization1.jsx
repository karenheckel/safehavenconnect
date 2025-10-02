import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import NavigationBar from "../../components/NavigationBar";

const Organization1 = () => {
  return (
    <>
      <NavigationBar />
      <Container className="my-5">
        <h1 className="text-center">The SAFE Alliance</h1>
        <Row className="my-3 align-items-center">
          <Col md={6}>
            <img
              src="https://www.safeaustin.org/wp-content/uploads/2018/08/fb.png"
              alt="The SAFE Alliance Logo"
              className="img-fluid rounded"
            />
          </Col>
          <Col className="text-center" md={6}>
            <Card body className="shadow-sm">
              <p>Location: 1515 Grove Blvd, Austin, TX 78741</p>
              <p>Services: Emergency Shelter, Counseling, Legal Advocacy</p>
              <p>
                Time: <br />
                Monday 8:00 am - 4:00 pm <br />
                Tuesday 8:00 am - 4:00 pm <br />
                Wednesday 8:00 am - 4:00 pm <br />
                Thursday 8:00 am - 4:00 pm <br />
                Friday 8:00 am - 4:00 pm <br />
                Saturday CLOSED <br />
                Sunday CLOSED
              </p>
              <p>Online Availability: Yes</p>
              <p>
                Target Demographic: Survivors of Domestic Violence, Sexual
                Assault, and Human Trafficking
              </p>
              <a href="https://www.safeaustin.org/">Learn more about SAFE</a>
            </Card>
          </Col>
        </Row>
        <Row className="my-3">
          <Col className="text-center" md={6}>
            <h3>Related Events</h3>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="https://www.safeaustin.org/wp-content/uploads/2018/08/fb.png" />
              <Card.Body>
                <Card.Title>Volunteer Information Session</Card.Title>
                <Card.Text>Location: 1515 Grove Blvd, Austin, TX 78741</Card.Text>
                <Card.Text>Time: 6:00 pm - 7:30 pm</Card.Text>
                <Card.Text>Date: October 1, 2025</Card.Text>
                <Card.Text>Event Type: Informational</Card.Text>
                <Card.Text>Organization: The SAFE Alliance</Card.Text>
                <Button
                  style={{
                    color: "black",
                    backgroundColor: "#cde5d7",
                    borderColor: "black",
                  }}
                  href="/event1"
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
                            src="https://www.safeaustin.org/wp-content/uploads/2018/08/fb.png"
                          />
                          <Card.Body>
                            <Card.Title>Kelly White Family Shelter</Card.Title>
                            <p>Location: 4800 Manor Rd A, Austin, TX 78723</p>
                          <p>Type: Shelter/Housing</p>
                          <p>Hours: 24/7</p>
                          <p>Online Availability: No</p>
                            <Button
                              style={{
                                color: "black",
                                backgroundColor: "#cde5d7",
                                borderColor: "black",
                              }}
                              href="/resource1"
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

export default Organization1;
