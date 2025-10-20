import React from "react";
import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import InfoCard from "../components/InfoCard";
import axios from "axios";

const DATABASE_URL = "http://localhost:5001";

const Events = () => {
  const [eventsInfo, setEventsInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await axios.get(DATABASE_URL, "/api/events");
        const formatEvents = res.data.map((event) => ({
          title: event.name,
          location: event.location,
          time: event.start_time,
          date: event.date,
          eventType: event.event_type,
          organization: event.relatedOrganizations[0].title,
          imgUrl: event.image_url,
          pageLink: event.event_url,
        }));
        setEventsInfo(formatEvents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };
    getEvents();
  }, []);

  if (loading) {
    return (
      <>
        <NavigationBar />
        <p>Loading events</p>
      </>
    );
  }

  // const eventsInfo = [
  //   {
  //     title: "Volunteer Information Session",
  //     location: "1515 Grove Blvd, Austin, TX 78741",
  //     time: "6:00 pm - 7:30 pm",
  //     date: "October 1, 2025",
  //     eventType: "Informational",
  //     organization: "The SAFE Alliance",
  //     imgUrl: "https://www.safeaustin.org/wp-content/uploads/2018/08/fb.png",
  //     pageLink: "/event1",
  //   },
  //   {
  //     title:
  //       "Hope Alliance Survive. Thrive. Prevent 5K Run/Walk",
  //     location: "445 E Morrow St, Georgetown, TX 78626 (San Gabriel Park)",
  //     time: "9:00 am - 12:00 pm",
  //     date: "October 11, 2025",
  //     eventType: "Fundraising",
  //     organization: "Hope Alliance",
  //     imgUrl:
  //       "https://www.hopealliancetx.org/wp-content/uploads/HopeAlliance_Logo_color_tagline-1-300x300.png",
  //     pageLink: "/event2",
  //   },
  //   {
  //     title: "TCFV’s 2025 Texas Town Hall",
  //     location: "Texas Tribune Headquarters, Austin, TX",
  //     time: "10:00 am - 12:00 pm",
  //     date: "October 3, 2025",
  //     eventType: "Panel",
  //     organization: "Texas Council on Family Violence",
  //     imgUrl: "https://tcfv.org/wp-content/themes/tcfv/assets/img/logo.svg",
  //     pageLink: "/event3",
  //   },
  // ];

  return (
    <>
      <NavigationBar />
      <Container className="text-center my-5">
        <h1>Upcoming Events</h1>
        <p>Number of events: {eventsInfo.length}</p>
        <Row className="justify-content-center">
          {eventsInfo.map((eventInfo, index) => (
            <InfoCard key={index} cardType="event" cardInfo={eventInfo} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Events;
