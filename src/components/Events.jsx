import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const Events = () => {
  return (
    <Container>
      <h1>Upcoming Events</h1>
      <Row>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="https://picsum.photos/180/100" />
          <Card.Body>
            <Card.Title>Event 1</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="https://picsum.photos/180/100" />
          <Card.Body>
            <Card.Title>Event 2</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="https://picsum.photos/180/100" />
          <Card.Body>
            <Card.Title>Event 3</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default Events;
