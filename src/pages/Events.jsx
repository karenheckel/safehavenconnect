import React from "react";
import { Container, Row, Card, Button } from "react-bootstrap";
import NavBar from "../components/NavBar";

const Events = () => {
  const eventsInfo = [
    {
      title: "Volunteer Information Session",
      location: "1515 Grove Blvd, Austin, TX 78741",
      time: "6:00 pm - 7:30 pm",
      date: "October 1, 2025",
      eventType: "Informational",
      imgUrl: "https://www.safeaustin.org/wp-content/uploads/2018/08/fb.png",
      pageLink: "/event1",
    },
    {
      title:
        "Understanding Domestic Abuse and the Impact on Children and Families",
      location: "Online",
      time: "10:30 am - 11:30 am",
      date: "October 9, 2025",
      eventType: "Informational",
      imgUrl:
        "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1081174993%2F249324158147%2F1%2Foriginal.20250725-115152?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=295%2C0%2C792%2C396&s=50166504b332a1ee1f268b31b16442fa",
      pageLink: "/event2",
    },
    {
      title: "TCFV’s 2025 Texas Town Hall",
      location: "Texas Tribune Headquarters, Austin, TX",
      time: "10:00 am - 12:00 pm",
      date: "October 3, 2025",
      eventType: "Panel",
      imgUrl: "https://tcfv.org/wp-content/themes/tcfv/assets/img/logo.svg",
      pageLink: "/event3",
    },
  ];
  return (
    <>
      <NavBar />
      <Container className="text-center my-5">
        <h1>Upcoming Events</h1>
        <p>Number of events: {eventsInfo.length}</p>
        <Row className="justify-content-center">
          {eventsInfo.map((eventInfo) => (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={eventInfo.imgUrl} />
              <Card.Body>
                <Card.Title>{eventInfo.title}</Card.Title>
                <Card.Text>Location: {eventInfo.location}</Card.Text>
                <Card.Text>Time: {eventInfo.time}</Card.Text>
                <Card.Text>Date: {eventInfo.date}</Card.Text>
                <Card.Text>Event Type: {eventInfo.eventType}</Card.Text>
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
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Events;
