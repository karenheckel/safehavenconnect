import React from "react";
import { Card, Button } from "react-bootstrap";

const EventCard = (eventInfo) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={eventInfo.imgUrl} />
      <Card.Body>
        <Card.Title>{eventInfo.title}</Card.Title>
        <Card.Text>Location: {eventInfo.location}</Card.Text>
        <Card.Text>Time: {eventInfo.time}</Card.Text>
        <Card.Text>Date: {eventInfo.date}</Card.Text>
        <Card.Text>Event Type: {eventInfo.eventType}</Card.Text>
        <Card.Text>Organization: {eventInfo.organization}</Card.Text>
        <Button
          style={{
            color: "black",
            backgroundColor: "#cde5d7",
            borderColor: "black",
          }}
          href={eventInfo.pageLink}
        >
          View Event
        </Button>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
