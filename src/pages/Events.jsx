import React from "react";
import { Container, Row, Card, Button } from "react-bootstrap";
import NavBar from "../components/NavBar";

const Events = () => {
  return (
    <>
      <NavBar />
      <Container className="text-center my-5">
        <h1>Upcoming Events</h1>
        <Row className="justify-content-center">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://www.safeaustin.org/wp-content/uploads/2018/08/fb.png"
            />
            <Card.Body>
              <Card.Title>Volunteer Information Session</Card.Title>
              <Card.Text>Location: 1515 Grove Blvd, Austin, TX 78741</Card.Text>
              <Card.Text>Time: 6:00 pm - 7:30 pm</Card.Text>
              <Card.Text>Date: October 1, 2025</Card.Text>
              <Card.Text>Event Type: Informational</Card.Text>
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
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1081174993%2F249324158147%2F1%2Foriginal.20250725-115152?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=295%2C0%2C792%2C396&s=50166504b332a1ee1f268b31b16442fa"
            />
            <Card.Body>
              <Card.Title>
                Understanding Domestic Abuse and the Impact on Children and
                Families
              </Card.Title>
              <Card.Text>Location: Online</Card.Text>
              <Card.Text>Time: 10:30 am - 11:30 am</Card.Text>
              <Card.Text>Date: October 9, 2025</Card.Text>
              <Card.Text>Event Type: Informational</Card.Text>
              <Button
                style={{
                  color: "black",
                  backgroundColor: "#cde5d7",
                  borderColor: "black",
                }}
                href="/event2"
              >
                View Event
              </Button>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://tcfv.org/wp-content/themes/tcfv/assets/img/logo.svg"
            />
            <Card.Body>
              <Card.Title>TCFV’s 2025 Texas Town Hall</Card.Title>
              <Card.Text>
                Location: Texas Tribune Headquarters, Austin, TX
              </Card.Text>
              <Card.Text>Time: 10:00 am - 12:00 pm</Card.Text>
              <Card.Text>Date: October 3, 2025</Card.Text>
              <Card.Text>Event Type: Panel</Card.Text>
              <Button
                style={{
                  color: "black",
                  backgroundColor: "#cde5d7",
                  borderColor: "black",
                }}
                href="/event3"
              >
                View Event
              </Button>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
};

export default Events;
