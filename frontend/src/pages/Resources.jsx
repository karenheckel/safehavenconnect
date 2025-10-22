import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Card, Button } from "react-bootstrap";
import InfoCard from "../components/InfoCard";
import axios from "axios";

const DATABASE_URL = "http://localhost:5001";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1)
  const cardsOnPage = 10

  useEffect(() => {
    const getResources = async () => {
      try {
        const res = await axios.get(`${DATABASE_URL}/api/resources`);
        const formatResources = res.data.map((resource) => ({
          title: resource.title,
          location: resource.location,
          type: resource.topic,
          // TODO: Need these attributes to be added to App.py
          // hours: resource.hours || "N/A",
          // onlineAvailability: resource.online_availability ? "Yes" : "No",
          organization: resource.organization_name,
          imgUrl: resource.image_url,
          pageLink: resource.website_url,
        }));
        setResources(formatResources);
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setLoading(false);
      }
    };
    getResources();
  }, []);

  if (loading) {
    return (
      <>
        <p className="text-center mt-5">Loading resources</p>
      </>
    );
  }

  const lastEvent = currPage * cardsOnPage
  const firstEvent = lastEvent - cardsOnPage
  const presentedResources = resources.slice(firstEvent, lastEvent)
  const numPages = Math.ceil(resources.length / cardsOnPage)

  return (
    <>
      <Container className="text-center my-5">
        <h1>Resources</h1>
        <p>Number of resources: {resources.length}</p>
        <Row className="justify-content-center">
          {presentedResources.map((res, index) => (
            <InfoCard key={index} cardType="resource" cardInfo={res} />
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
              setCurrPage((prev) =>
                prev < numPages ? prev + 1 : prev
              )
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

export default Resources;
