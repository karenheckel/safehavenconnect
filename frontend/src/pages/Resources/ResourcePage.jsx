import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InfoCard from "../../components/InfoCard";

const ResourcePage = () => {
  const { id } = useParams();
  const [resourceInfo, setResourceInfo] = useState(null);

  useEffect(() => {
    const getResourceInfo = async () => {
      try {
        const res = await axios.get(`https://backend.safehavenconnect.me/api/resources/${id}`);
        setResourceInfo(res.data);
      } catch (err) {
        console.error("Error fetching resource:", err);
      }
    };

    getResourceInfo();
  }, [id]);

  if (!resourceInfo) {
    return (
      <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <div className="spinner-border mb-3" role="status"></div>
        <h4 className="mt-2">Loading Resource Info...</h4>
      </Container>
    );
  }

  return (
    <>
      <Container className="my-5">
        <h1 className="text-center">{resourceInfo.name}</h1>
        <Row className="my-3 align-items-center">
          <Col md={6} className="d-flex justify-content-center">
            <img
              src={resourceInfo.image_url}
              alt={resourceInfo.name}
              className="img-fluid rounded"
            />
          </Col>
          <Col className="text-center" md={6}>
            <Card body className="shadow-sm">
              <p>Location: {resourceInfo.location}</p>
              {/* TODO add resource type, online availability, hours/times */}
              <p>Type: {resourceInfo.type}</p>
              <p>Hours: {resourceInfo.hours}</p>
              <p>Online Availability: {resourceInfo.online_availability}</p>
              <a href={resourceInfo.resource_url}>
                Learn more about {resourceInfo.name}
              </a>
            </Card>
          </Col>
        </Row>
        <Row className="my-3">
          <Col className="text-center" md={6}>
            <h3>Related Organizations</h3>
            {
              // list of instances
              resourceInfo.organization_ids.map((orgId) => (
                <InfoCard
                  key={orgId}
                  cardType="organization"
                  cardInfo={{ id: orgId }}
                />
              ))
            }
          </Col>
          <Col className="text-center" md={6}>
            <h3>Related Events</h3>
            {resourceInfo.event_ids.map((eventId) => (
              <InfoCard
                key={eventId}
                cardType="event"
                cardInfo={{ id: eventId }}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResourcePage;
