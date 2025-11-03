import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Card, Button } from "react-bootstrap";
import InfoCard from "../components/InfoCard";
import axios from "axios";
import backupData from "../backupData.json"

const BACKEND_URL = "https://backend.safehavenconnect.me";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1)
  const cardsOnPage = 10

  useEffect(() => {
    const getResources = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/resources`);
        const formatResources = res.data.map((resource) => ({
          title: resource.title,
          location: resource.location,
          resource_type: resource.topic,
          hours: resource.hours_of_operation || "N/A",
          online_availability: resource.online_availability ? "Yes" : "No",
          organization: resource.organization_name,
          image_url: resource.image_url,
          pageLink: resource.website_url,
          id: resource.id,
          services: resource.services,
        }));
        if (formatResources.length === 0) {
          setResources(backupData.resources);
        } else {
          setResources(formatResources);
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
        setResources(backupData.resources);
      } finally {
        setLoading(false);
      }
    };
    getResources();
  }, []);

  if (loading) {
    return (
      <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <div className="spinner-border mb-3" role="status"></div>
        <h4 className="mt-2">Loading Resources...</h4>
      </Container>
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
            <InfoCard key={index} cardType="resource" cardInfo={res} id={res.id}/>
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
