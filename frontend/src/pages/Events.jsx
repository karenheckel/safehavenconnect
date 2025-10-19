import React from "react";
import { Container, Row, Card, Button } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";

const Events = () => {
  const eventsInfo = [
    {
      title: "Volunteer Information Session",
      location: "1515 Grove Blvd, Austin, TX 78741",
      time: "6:00 pm - 7:30 pm",
      date: "October 1, 2025",
      eventType: "Informational",
      organization: "The SAFE Alliance",
      imgUrl: "https://www.safeaustin.org/wp-content/uploads/2018/08/fb.png",
      pageLink: "/event1",
    },
    {
      title:
        "Hope Alliance Survive. Thrive. Prevent 5K Run/Walk",
      location: "445 E Morrow St, Georgetown, TX 78626 (San Gabriel Park)",
      time: "9:00 am - 12:00 pm",
      date: "October 11, 2025",
      eventType: "Fundraising",
      organization: "Hope Alliance",
      imgUrl:
        "https://www.hopealliancetx.org/wp-content/uploads/HopeAlliance_Logo_color_tagline-1-300x300.png",
      pageLink: "/event2",
    },
    {
      title: "TCFV’s 2025 Texas Town Hall",
      location: "Texas Tribune Headquarters, Austin, TX",
      time: "10:00 am - 12:00 pm",
      date: "October 3, 2025",
      eventType: "Panel",
      organization: "Texas Council on Family Violence",
      imgUrl: "https://tcfv.org/wp-content/themes/tcfv/assets/img/logo.svg",
      pageLink: "/event3",
    },
  ];
  return (
    <>
      <NavigationBar />
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
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Events;
