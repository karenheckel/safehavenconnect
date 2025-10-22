import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Card, Button } from "react-bootstrap";
import InfoCard from "../components/InfoCard";
import axios from "axios";

const DATABASE_URL = "http://localhost:5001";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // const resInfo = [
  //   {
  //     title: "Kelly White Family Shelter",
  //     location: "4800 Manor Rd A, Austin, TX 78723",
  //     type: "Shelter/Housing",
  //     hours: "24/7",
  //     organization: "The SAFE Alliance",
  //     onlineAvailability: "No",
  //     imgUrl: "https://www.safeaustin.org/wp-content/uploads/2018/08/fb.png",
  //     pageLink: "/resource1",
  //   },
  //   {
  //     title:
  //       "24 Hour HOPELine",
  //     location: "1-800-460-7233",
  //     type: "Crisis Hotline",
  //     hours: "24/7",
  //     organization: "Hope Alliance",
  //     onlineAvailability: "Yes",
  //     imgUrl:
  //       "https://www.hopealliancetx.org/wp-content/uploads/HopeAlliance_Logo_color_tagline-1-300x300.png",
  //     pageLink: "/resource2",
  //   },
  //   {
  //     title: "Domestic Violence Awareness Month Resources",
  //     location: "https://tcfv.org/awareness/",
  //     type: "Informational",
  //     hours: "N/A",
  //     organization: "Texas Council on Family Violence",
  //     onlineAvailability: "Yes",
  //     imgUrl: "https://tcfv.org/wp-content/themes/tcfv/assets/img/logo.svg",
  //     pageLink: "/resource3",
  //   },
  // ];
  return (
    <>
      <Container className="text-center my-5">
        <h1>Resources</h1>
        <p>Number of resources: {resources.length}</p>
        <Row className="justify-content-center">
          {resources.map((res, index) => (
            <InfoCard key={index} cardType="resource" cardInfo={res} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Resources;
