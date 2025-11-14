import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Information from "../components/Information";

const Landing = () => {
  return (
    <>

      <div
        style={{
          backgroundColor: "#f7faf8",
          padding: "6rem 0",
          borderBottom: "1px solid #e5ece8",
        }}
      >
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={10} lg={8}>
              <h1 className="display-4 fw-bold">SafeHavenConnect</h1>

              <p className="lead mt-3" style={{ color: "#4f5a56" }}>
                A platform that organizes and provides domestic violence
                resources to those struggling to find reliable, accessible, and
                local resources for safety, legal, medical, financial aid, and
                support events
              </p>

            </Col>
          </Row>
        </Container>
      </div>

      {/* What We Provide Section */}
      <div style={{ backgroundColor: "white" }}>
        <Information />
      </div>

    </>
  );
};

export default Landing;
