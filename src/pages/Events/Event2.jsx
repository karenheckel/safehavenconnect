import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import NavBar from "../../components/NavBar";

const Event2 = () => {
  return (
    <>
      <NavBar />
      <Container className="my-5">
        <h1 className="text-center">
          Hope Alliance Survive. Thrive. Prevent 5K Run/Walk
        </h1>
        <Row className="my-3 align-items-center">
          <Col md={6}>
            <img
              src="https://www.hopealliancetx.org/wp-content/uploads/HopeAlliance_Logo_color_tagline-1-300x300.png"
              alt="Adele Gladman & Associates Logo"
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
        <Row className="my-3">
          <Col className="text-center" md={6}>
            <h3>Related Organizations</h3>
            <p>
              <strong>Organizer:</strong> Hope Alliance
            </p>
            <Button href="/organization3">Organization Info</Button>
            <p>
              <strong>More Info:</strong>{" "}
              <a href="https://www.hopealliancetx.org/">Hope Alliance</a>
            </p>
          </Col>
          <Col className="text-center" md={6}>
            <h3>Related Resources</h3>
          </Col>
        </Row>
        <Row>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27459.248913974126!2d-97.69018351709903!3d30.650690702834712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644d63bd7a7dd71%3A0xa514c5cfeedee4fa!2sSan%20Gabriel%20Park!5e0!3m2!1sen!2sus!4v1759351120144!5m2!1sen!2sus"
            width="600"
            height="450"
            style={{ border:0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </Row>
      </Container>
    </>
  );
};

export default Event2;
