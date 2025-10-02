import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import NavigationBar from "../../components/NavigationBar";

const Event2 = () => {
  return (
    <>
      <NavigationBar />
      <Container className="my-5">
        <h1 className="text-center">
          Hope Alliance Survive. Thrive. Prevent 5K Run/Walk
        </h1>
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
              <p>
                Location: San Gabriel Park, 445 E Morrow St, Georgetown, TX
                78626
              </p>
              <p>Date: October 11, 2025</p>
              <p>Time: 9:00 am - 12:00 pm</p>
              <p>Event Type: Fundraising</p>
              <a href="https://runsignup.com/Race/TX/Georgetown/HopeAllianceSurvivetoThrive5K">
                Event Link
              </a>
            </Card>
          </Col>
        </Row>
        <Row>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27459.248913974126!2d-97.69018351709903!3d30.650690702834712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644d63bd7a7dd71%3A0xa514c5cfeedee4fa!2sSan%20Gabriel%20Park!5e0!3m2!1sen!2sus!4v1759351120144!5m2!1sen!2sus"
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
                src="https://www.hopealliancetx.org/wp-content/uploads/HopeAlliance_Logo_color_tagline-1-300x300.png"
              />
              <Card.Body>
                <Card.Title>Hope Alliance</Card.Title>
                <Card.Text>
                  Location: 1011 Gattis School Rd, Ste 110 Round Rock, TX 78664
                </Card.Text>
                <Card.Text>
                  Services: Emergency Shelter, Counseling, Legal Advocacy
                </Card.Text>
                <Card.Text>
                  Hours: <br />
                  Monday 12:00 am - 4:00 pm <br />
                  Tuesday 12:00 am - 4:00 pm <br />
                  Wednesday 12:00 am - 4:00 pm <br />
                  Thursday 12:00 am - 4:00 pm <br />
                  Friday CLOSED <br />
                  Saturday CLOSED <br />
                  Sunday CLOSED
                </Card.Text>
                <Card.Text>Online Availability: Yes</Card.Text>
                <Card.Text>
                  Target Demographic: Survivors of Domestic Violence and Sexual
                  Assault
                </Card.Text>
                <Button
                  style={{
                    color: "black",
                    backgroundColor: "#cde5d7",
                    borderColor: "black",
                  }}
                  href="/organization2"
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

export default Event2;
