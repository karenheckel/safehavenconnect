import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

const Information = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center">What We Provide</h1>
      <Row className="justify-content-center">
        <Col md={4} className="d-flex">
          <Card className="flex-fill text-center">
            <Card.Img variant="top" src="https://images.pexels.com/photos/159213/hall-congress-architecture-building-159213.jpeg" alt="image of tables and desks at an event"/>
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
            <Card.Img variant="top" src="https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg" alt='Stack of books' />
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
            <Card.Img variant="top" src="https://images.pexels.com/photos/1451040/pexels-photo-1451040.jpeg" alt='colorful umbrellas' />
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