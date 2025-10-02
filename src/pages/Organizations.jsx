import React from "react";
import { Container, Row, Card, Button } from "react-bootstrap";
import NavBar from "../components/NavBar";

const Organizations = () => {
  return (
    <>
      <NavBar />
      <Container className="text-center my-5">
        <h1>Organizations</h1>
        <p>Number of Organizations: 3</p>
        <Row className="justify-content-center">

          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://www.safeaustin.org/wp-content/uploads/2018/08/fb.png"
            />
            <Card.Body>
              <Card.Title>The SAFE Alliance</Card.Title>
              <Card.Text>Location: 1515 Grove Blvd, Austin, TX 78741</Card.Text>
              <Card.Text>
                Services: Emergency Shelter, Counseling, Legal Advocacy
              </Card.Text>
              <Card.Text>
                Hours: 24/7
              </Card.Text>
              <Card.Text>Online Availability: Yes</Card.Text>
              <Card.Text>
                Target Demographic: Survivors of Domestic Violence, Sexual
                Assault, and Human Trafficking
              </Card.Text>
              <Button
                style={{
                  color: "black",
                  backgroundColor: "#cde5d7",
                  borderColor: "black",
                }}
                href="/organization1"
              >
                View Organization
              </Button>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://www.hopealliancetx.org/wp-content/uploads/HopeAlliance_Logo_color_tagline-1-300x300.png"
            />
            <Card.Body>
              <Card.Title>Hope Alliance</Card.Title>
              <Card.Text>
                Location: 1011 Gattis School Rd, Ste 110 Round Rock, TX 78664
              </Card.Text>
              <Card.Text>
                Services: Emergency Shelter, Counseling, Legal Advocacy
              </Card.Text>
              <Card.Text>
                Hours: 24/7
              </Card.Text>
              <Card.Text>Online Availability: Yes</Card.Text>
              <Card.Text>
                Target Demographic: Survivors of Domestic Violence and Sexual
                Assault
              </Card.Text>
              <Button
                style={{
                  color: "black",
                  backgroundColor: "#cde5d7",
                  borderColor: "black",
                }}
                href="/organization2"
              >
                View Organization
              </Button>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://tcfv.org/wp-content/themes/tcfv/assets/img/logo.svg"
            />
            <Card.Body>
              <Card.Title>Texas Council on Family Violence</Card.Title>
              <Card.Text>Location: PO Box 163865, Austin, TX 78716</Card.Text>
              <Card.Text>Services: Trainings, Technical Assistance, Materials, Prevention Efforts</Card.Text>
              <Card.Text>Hours: n/a</Card.Text>
              <Card.Text>Online Availability: Yes</Card.Text>
              <Card.Text>
                Target Users: Family Violence Programs and Advocates
              </Card.Text>
              <Button
                style={{
                  color: "black",
                  backgroundColor: "#cde5d7",
                  borderColor: "black",
                }}
                href="/organization3"
              >
                View Organization
              </Button>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
};

export default Organizations;
