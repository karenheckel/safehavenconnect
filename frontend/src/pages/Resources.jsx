import React from "react";
import { Container, Row, Card, Button } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";

const Resources = () => {
  const resInfo = [
    {
      title: "Kelly White Family Shelter",
      location: "4800 Manor Rd A, Austin, TX 78723",
      type: "Shelter/Housing",
      hours: "24/7",
      organization: "The SAFE Alliance",
      onlineAvailability: "No",
      imgUrl: "https://www.safeaustin.org/wp-content/uploads/2018/08/fb.png",
      pageLink: "/resource1",
    },
    {
      title:
        "24 Hour HOPELine",
      location: "1-800-460-7233",
      type: "Crisis Hotline",
      hours: "24/7",
      organization: "Hope Alliance",
      onlineAvailability: "Yes",
      imgUrl:
        "https://www.hopealliancetx.org/wp-content/uploads/HopeAlliance_Logo_color_tagline-1-300x300.png",
      pageLink: "/resource2",
    },
    {
      title: "Domestic Violence Awareness Month Resources",
      location: "https://tcfv.org/awareness/",
      type: "Informational",
      hours: "N/A",
      organization: "Texas Council on Family Violence",
      onlineAvailability: "Yes",
      imgUrl: "https://tcfv.org/wp-content/themes/tcfv/assets/img/logo.svg",
      pageLink: "/resource3",
    },
  ];
  return (
    <>
      <NavigationBar />
      <Container className="text-center my-5">
        <h1>Resources</h1>
        <p>Number of resources: {resInfo.length}</p>
        <Row className="justify-content-center">
          {resInfo.map((resInfo) => (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={resInfo.imgUrl} />
              <Card.Body>
                <Card.Title>{resInfo.title}</Card.Title>
                <Card.Text>Location: {resInfo.location}</Card.Text>
                <Card.Text>Type: {resInfo.type}</Card.Text>
                <Card.Text>Hours: {resInfo.hours}</Card.Text>
                <Card.Text>Online Availability: {resInfo.onlineAvailability}</Card.Text>
                <Card.Text>Organization: {resInfo.organization}</Card.Text>
                <Button
                  style={{
                    color: "black",
                    backgroundColor: "#cde5d7",
                    borderColor: "black",
                  }}
                  href={resInfo.pageLink}
                >
                  View Resource
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Resources;
