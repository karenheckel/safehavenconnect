import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import NavBar from "../../components/NavBar";

const Resource1 = () => {
  return (
    <>
      <NavBar />
      <Container className="my-5">
        <h1 className="text-center">Kelly White Family Shelter</h1>
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
              <p>Location: 4800 Manor Rd A, Austin, TX 78723</p>
              <p>Type: Shelter/Housing</p>
              <p>Hours: 24/7</p>
              <p>Online Availability: No</p>
            </Card>
          </Col>
        </Row>
        <Row>
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6889.94812076731!2d-97.69342282483902!3d30.2948000747984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b60468808c53%3A0x940d411111f829a9!2s4800%20Manor%20Rd%2C%20Austin%2C%20TX%2078723!5e0!3m2!1sen!2sus!4v1759359636456!5m2!1sen!2sus" 
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
                  Hours: 24/7
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
                  href="/organization2"
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
                  Hours: 24/7
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
                  href="/organization2"
                >
                  View Organization
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Resource1;
