import React from "react";
import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import InfoCard from "../components/InfoCard";
import axios from "axios";

const BACKEND_URL = "https://backend.safehavenconnect.me";

const backupEvents = [
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
    title: "Hope Alliance Survive. Thrive. Prevent 5K Run/Walk",
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

const Events = () => {
  const [eventsInfo, setEventsInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const cardsOnPage = 10;

  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await axios.get(BACKEND_URL, "/api/events");
        const formatEvents = res.data.map((event) => ({
          eventId: event.id,
          title: event.name,
          location: event.location,
          time: event.start_time,
          date: event.date,
          eventType: event.event_type,
          organization: event.relatedOrganizations[0].title,
          imgUrl: event.image_url,
          pageLink: event.event_url,
        }));
        if (formatEvents.length === 0) {
          setEventsInfo(backupEvents);
        } else {
          setEventsInfo(formatEvents);
        }
      } catch (error) {
        console.error("Error fetching events from API", error);
        setEventsInfo(backupEvents);
      } finally {
        setLoading(false);
      }
    };
    getEvents();
  }, []);

  if (loading) {
    return (
      <Container
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <div className="spinner-border mb-3" role="status"></div>
        <h4 className="mt-2">Loading Events...</h4>
      </Container>
    );
  }

  const lastEvent = currPage * cardsOnPage;
  const firstEvent = lastEvent - cardsOnPage;
  const presentedEvents = eventsInfo.slice(firstEvent, lastEvent);
  const numPages = Math.ceil(eventsInfo.length / cardsOnPage);

  return (
    <>
      <Container className="text-center my-5">
        <h1>Upcoming Events</h1>
        <p>Number of events: {eventsInfo.length}</p>
        <Row className="justify-content-center">
          {presentedEvents.map((eventInfo, index) => (
            <InfoCard
              key={index}
              cardType="event"
              cardInfo={eventInfo}
              id={eventInfo.eventId}
            />
          ))}
        </Row>

        <Container className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-secondary mx-2"
            onClick={() => setCurrPage((prev) => Math.max(prev - 1, 1))}
            disabled={currPage === 1}
          >
            Previous
          </button>

          <span className="align-self-center mx-2">
            Page {currPage} of {numPages}
          </span>

          <button
            className="btn btn-secondary mx-2"
            onClick={() =>
              setCurrPage((prev) => (prev < numPages ? prev + 1 : prev))
            }
            disabled={currPage >= numPages}
          >
            Next
          </button>
        </Container>
      </Container>
    </>
  );
};

export default Events;
