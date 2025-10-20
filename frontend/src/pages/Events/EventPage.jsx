import React from 'react'
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import NavigationBar from "../../components/NavigationBar";
import EventCard from '../../components/EventCard';
import InfoCard from '../../components/InfoCard';

const EventPage = (eventInfo) => {
  return (
    <>
      <NavigationBar />
      <Container className="my-5">
        <h1 className="text-center">{eventInfo.title}</h1>
        <Row className="my-3 align-items-center">
          <Col md={6} className="d-flex justify-content-center">
            <img
              src={eventInfo.imgUrl}
              alt={eventInfo.imgAlt}
              className="img-fluid rounded"
            />
          </Col>
          <Col className="text-center" md={6}>
            <Card body className="shadow-sm">
              <p>Location: {eventInfo.location}</p>
              <p>Date: {eventInfo.date}</p>
              <p>Time: {eventInfo.time}</p>
              <p>Event Type: {eventInfo.eventType}</p>
              <a href={eventInfo.eventWebsiteLink}>
                Event Link
              </a>
            </Card>
          </Col>
        </Row>
        <Row>
          <iframe
            src={eventInfo.mapUrl}
            width="600"
            height="450"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </Row>
        <Row className="my-3">
          <Col className="text-center" md={6}>
            <h3>Related Organizations</h3>
            {
                // list of instances
                eventInfo.relatedOrganizations.map((orgInfo) => <InfoCard cardType="organization" cardInfo={orgInfo}/>)
            }
          </Col>
          <Col className="text-center" md={6}>
            <h3>Related Resources</h3>
            {
                // list of instances
                eventInfo.relatedResources.map((resourceInfo) => <InfoCard cardType="resource" cardInfo={resourceInfo}/>)
            }
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default EventPage