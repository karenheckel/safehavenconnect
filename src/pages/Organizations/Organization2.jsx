import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import NavBar from "../../components/NavBar";

const Organization2 = () => {
  return (
    <>
      <NavBar />
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
            </Card>
          </Col>
        </Row>
        <Row className="my-3">
          <Col className="text-center" md={6}>
            <h3>Related Events</h3>
            <Button href="/event1">Upcoming Organization Events</Button>
            <p>
              <strong>More Info:</strong>{" "}
              <a href="https://www.safeaustin.org/get-involved/donate/events/">
                The SAFE Alliance Events
              </a>
            </p>
          </Col>
          <Col className="text-center" md={6}>
            <h3>Related Resources</h3>
            <Button href="/">All Organization Resources</Button>
            <p>
              <strong>More Info:</strong>{" "}
              <a href="https://www.safeaustin.org/our-services/">
                The SAFE Alliance Resources
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Organization2;
