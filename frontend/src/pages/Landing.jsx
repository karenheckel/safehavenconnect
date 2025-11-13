import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Information from "../components/Information";

const Landing = () => {
  return (
    <>
      {/* Title section */}
      <div style={{ backgroundColor: "#f5f7f6", padding: "4rem 0" }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-4 fw-bold">SafeHavenConnect</h1>
              <p className="lead mt-3">
                A platform that organizes and provides domestic violence
                resources to those struggling to find reliable, accessible, and
                local resources for safety, legal, medical, financial aid, and
                support events
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <Information />
    </>
  );
};

export default Landing;
