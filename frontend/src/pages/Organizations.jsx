import React from "react";
import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import InfoCard from "../components/InfoCard";
import axios from "axios";

const DATABASE_URL = "http://localhost:5001";

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrganizations = async () => {
      try {
        const res = await axios.get(`${DATABASE_URL}/api/organizations`);
        const formatOrgs = res.data.map((org) => ({
          title: org.name,
          location: org.location,
          services: org.services,
          hours: org.hours || "N/A",
          online: org.online_availability ? "Yes" : "No",
          orgType: org.organization_type,
          imgUrl: org.image_url,
          pageLink: org.website_url,
        }));
        setOrganizations(formatOrgs);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      } finally {
        setLoading(false);
      }
    };
    getOrganizations();
  }, []);

  if (loading) {
    return (
      <>
        <p>Loading organizations</p>
      </>
    );
  }

  return (
    <>
      <Container className="text-center my-5">
        <h1>Organizations</h1>
        <p>Number of Organizations: {organizations.length}</p>
        <Row className="justify-content-center">
          {organizations.map((org, index) => (
            <InfoCard key={index} cardType="organization" cardInfo={org} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Organizations;
