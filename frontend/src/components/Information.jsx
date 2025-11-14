import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Information = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">What We Provide</h1>

      <Row className="justify-content-center gy-4">

        <Col md={4} className="d-flex">
          <Card className="flex-fill shadow-sm border-0 rounded-4 text-center">
            <Card.Img
              variant="top"
              src="https://images.pexels.com/photos/159213/hall-congress-architecture-building-159213.jpeg"
              alt="tables and desks at an event"
              className="rounded-top-4"
              style={{ height: "220px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title className="fw-bold">Events</Card.Title>
              <Card.Text style={{ minHeight: "70px" }}>
                Explore upcoming events near you, from support groups, workshops, or community service
              </Card.Text>
              <Button
                href="/events"
                style={{
                  backgroundColor: "#2e856e",
                  borderColor: "#2e856e",
                  color: "white",
                  borderRadius: "50px",
                  padding: "0.6rem 1.3rem",
                  fontWeight: "500",
                }}
              >
                View Events
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="d-flex">
          <Card className="flex-fill shadow-sm border-0 rounded-4 text-center">
            <Card.Img
              variant="top"
              src="https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg"
              alt="stack of books"
              className="rounded-top-4"
              style={{ height: "220px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title className="fw-bold">Resources</Card.Title>
              <Card.Text style={{ minHeight: "70px" }}>
                Find resources and information such as medical services, education, financial aid, legal assistance, and online guides.
              </Card.Text>
              <Button
                href="/resources"
                style={{
                  backgroundColor: "#2e856e",
                  borderColor: "#2e856e",
                  color: "white",
                  borderRadius: "50px",
                  padding: "0.6rem 1.3rem",
                  fontWeight: "500",
                }}
              >
                View Resources
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="d-flex">
          <Card className="flex-fill shadow-sm border-0 rounded-4 text-center">
            <Card.Img
              variant="top"
              src="https://images.pexels.com/photos/1451040/pexels-photo-1451040.jpeg"
              alt="colorful umbrellas"
              className="rounded-top-4"
              style={{ height: "220px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title className="fw-bold">Organizations</Card.Title>
              <Card.Text style={{ minHeight: "70px" }}>
                Find organizations in your area that provide support
              </Card.Text>
              <Button
                href="/organizations"
                style={{
                  backgroundColor: "#2e856e",
                  borderColor: "#2e856e",
                  color: "white",
                  borderRadius: "50px",
                  padding: "0.6rem 1.3rem",
                  fontWeight: "500",
                }}
              >
                View Organizations
              </Button>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  );
};

export default Information;
