import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import NavBar from "../../components/NavBar";

const Organization3 = () => {
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
            <Button href="/">All Organization Events</Button>
            <p>
              <strong>More Info:</strong>{" "}
              <a href="https://www.hopealliancetx.org/events/">
                Hope Alliance Events
              </a>
            </p>
          </Col>
          <Col className="text-center" md={6}>
            <h3>Related Resources</h3>
            <Button href="/">All Organization Resources</Button>
            <p>
              <strong>More Info:</strong>{" "}
              <a href="https://www.hopealliancetx.org/#">
                Hope Alliance Resources
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Organization3;
