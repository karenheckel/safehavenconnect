import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import NavigationBar from "../../components/NavigationBar";

const Event1 = () => {
  return (
    <>
      <NavigationBar />
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
          <Col className="text-center" md={6}>
            <Card body className="shadow-sm">
              <p>Location: 1515 Grove Blvd, Austin, TX 78741</p>
              <p>Date: October 1, 2025</p>
              <p>Time: 6:00 pm - 7:30 pm</p>
              <p>Event Type: Informational</p>
              <a href="https://www.safeaustin.org/event/volunteer-information-session-6-2-2-2-2/">
                Event Link
              </a>
            </Card>
          </Col>
        </Row>
        <Row>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d474.53467889163176!2d-97.70611084451984!3d30.2309014345067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b502a80a8c0b%3A0xd1c23d702372dcd1!2sSAFE!5e0!3m2!1sen!2sus!4v1759346946221!5m2!1sen!2sus"
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
                src="https://www.safeaustin.org/wp-content/uploads/2018/08/fb.png"
              />
              <Card.Body>
                <Card.Title>The SAFE Alliance</Card.Title>
                <Card.Text>
                  Location: 1515 Grove Blvd, Austin, TX 78741
                </Card.Text>
                <Card.Text>
                  Services: Emergency Shelter, Counseling, Legal Advocacy
                </Card.Text>
                <Card.Text>
                  Hours: <br />
                  Monday 8:00 am - 4:00 pm <br />
                  Tuesday 8:00 am - 4:00 pm <br />
                  Wednesday 8:00 am - 4:00 pm <br />
                  Thursday 8:00 am - 4:00 pm <br />
                  Friday 8:00 am - 4:00 pm <br />
                  Saturday CLOSED <br />
                  Sunday CLOSED
                </Card.Text>
                <Card.Text>Online Availability: Yes</Card.Text>
                <Card.Text>
                  Target Demographic: Survivors of Domestic Violence, Sexual
                  Assault, and Human Trafficking
                </Card.Text>
                <Button
                  style={{
                    color: "black",
                    backgroundColor: "#cde5d7",
                    borderColor: "black",
                  }}
                  href="/organization1"
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

export default Event1;
