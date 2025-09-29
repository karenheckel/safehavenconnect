import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

const Information = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center">What We Provide</h1>
      <Row className="justify-content-center">
        <Col md={4} className="d-flex">
          <Card className="flex-fill text-center">
            <Card.Img variant="top" src="https://picsum.photos/180/100" />
            <Card.Body>
              <Card.Title>Events</Card.Title>
              <Card.Text>
                Explore upcoming events near you, from support groups, workshops, or community service
              </Card.Text>
              <Button style={{color: "black", backgroundColor: "#cde5d7", borderColor: "black"}} href="/events">View Events</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="d-flex">
          <Card className="flex-fill text-center">
            <Card.Img variant="top" src="https://picsum.photos/180/100" />
            <Card.Body>
              <Card.Title>Resources</Card.Title>
              <Card.Text>
                Find resources and information such as medical services, education, financial aid, legal assistance, and online guides.
              </Card.Text>
              <Button style={{color: "black", backgroundColor: "#cde5d7", borderColor: "black"}} href="/resources">View Resources</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="d-flex">
          <Card className="flex-fill text-center">
            <Card.Img variant="top" src="https://picsum.photos/180/100" />
            <Card.Body>
              <Card.Title>Organizations</Card.Title>
              <Card.Text>
                Find organizations in your area that provide support
              </Card.Text>
              <Button style={{color: "black", backgroundColor: "#cde5d7", borderColor: "black"}} href="/organizations">View Organizations</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Information