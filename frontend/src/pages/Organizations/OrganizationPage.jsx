import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InfoCard from "../../components/InfoCard";
import backupData from "../../backupData.json";

const OrganizationPage = () => {
  const { id } = useParams();
  const [orgInfo, setOrgInfo] = useState(null);

  useEffect(() => {
    if (id.startsWith("default")) {
      const backupOrg = backupData.organizations.find((org) => org.id === id);
      if (backupOrg) {
        setOrgInfo(backupOrg);
      }
    } else {
      const getOrgInfo = async () => {
        try {
          const res = await axios.get(
            `https://backend.safehavenconnect.me/api/organizations/${id}`
          );
          setOrgInfo(res.data);
        } catch (err) {
          console.error("Error fetching organization:", err);
        }
      };

      getOrgInfo();
    }
  }, [id]);

  if (!orgInfo) {
    return (
      <Container
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <div className="spinner-border mb-3" role="status"></div>
        <h4 className="mt-2">Loading Organization Info...</h4>
      </Container>
    );
  }

  return (
    <>
      <Container className="my-5">
        <h1 className="text-center">{orgInfo.name}</h1>
        <Row className="my-3 align-items-center">
          <Col md={6} className="d-flex justify-content-center">
            <img
              src={orgInfo.image_url}
              alt={orgInfo.name}
              className="img-fluid rounded"
            />
          </Col>
          <Col className="text-center" md={6}>
            <Card body className="shadow-sm">
              <p>Location: {orgInfo.location}</p>
              <p>Services: {orgInfo.services}</p>
              {/* TODO add organization hours/times */}
              <p>Time: {orgInfo.time}</p>
              <p>Online Availability: {orgInfo.online_availability}</p>
              <a href={orgInfo.website_url}>Learn more about {orgInfo.name}</a>
            </Card>
          </Col>
        </Row>
        <Row className="my-3">
          <Col className="text-center" md={6}>
            <h3>Related Events</h3>
            {
              // list of instances
              orgInfo.event_ids?.map((eventId) => (
                <InfoCard
                  key={eventId}
                  cardType="event"
                  cardInfo={{ id: eventId }}
                />
              ))
            }
          </Col>
          <Col className="text-center" md={6}>
            <h3>Related Resources</h3>
            {orgInfo.resource_ids?.map((resourceId) => (
              <InfoCard
                key={resourceId}
                cardType="resource"
                cardInfo={{ id: resourceId }}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrganizationPage;
