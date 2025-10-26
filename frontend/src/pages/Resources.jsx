import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Card, Button } from "react-bootstrap";
import InfoCard from "../components/InfoCard";
import axios from "axios";

const BACKEND_URL = "https://backend.safehavenconnect.me";

const backupResources = [
  {
    id: "default0",
    title: "Kelly White Family Shelter",
    location: "4800 Manor Rd A, Austin, TX 78723",
    resource_type: "Shelter/Housing",
    hours: "24/7",
    organization: "The SAFE Alliance",
    online_availability: "No",
    image_url: "https://www.safeaustin.org/wp-content/uploads/2018/08/fb.png",
    pageLink: "/resource1",
  },
  {
    id: "default1",
    title: "24 Hour HOPELine",
    location: "1-800-460-7233",
    resource_type: "Crisis Hotline",
    hours: "24/7",
    organization: "Hope Alliance",
    online_availability: "Yes",
    image_url:
      "https://www.hopealliancetx.org/wp-content/uploads/HopeAlliance_Logo_color_tagline-1-300x300.png",
    pageLink: "/resource2",
  },
  {
    id: "default2",
    title: "Domestic Violence Awareness Month Resources",
    location: "https://tcfv.org/awareness/",
    resource_type: "Informational",
    hours: "N/A",
    organization: "Texas Council on Family Violence",
    online_availability: "Yes",
    image_url: "https://tcfv.org/wp-content/themes/tcfv/assets/img/logo.svg",
    pageLink: "/resource3",
  },
];

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1)
  const cardsOnPage = 10

  useEffect(() => {
    const getResources = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/resource`);
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
          id: resource.id,
        }));
        if (formatResources.length === 0) {
          setResources(backupResources);
        } else {
          setResources(formatResources);
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
        setResources(backupResources);
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
