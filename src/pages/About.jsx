import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import { Container, Row, Col, Card, Image, Spinner } from "react-bootstrap";


/* Team list */
const team = [
  {
    photo: "/photos/karen_photo.jpg",
    name: "Karen Heckel",
    role: "Frontend Developer",
    bio: "I am a junior majoring in Computer Science. Currently, I am an Undergraduate Research Assistant at TACC and the Academic officer for HACS. Outside of school, I enjoy thrifting and watching movies!",
    commitIds: ["karenheckel"],
    gitlabUser: "karenheckel",
    unitTests: "0",
  },
  {
    photo: "/photos/parul_photo.jpeg",
    name: "Parul Sadasivuni",
    role: "Full Stack Developer",
    bio: "My name is Parul and I'm a junior in Computer Science and Business here at UT. I'm a research assistant with Dr. Caleb Kwon in the McCombs School of Business studying the impacts of minimum wage shocks on employment. In my free time, I enjoy music and watching Longhorn sports!",
    commitIds: ["txpsree@gmail.com", "Parul S Sadasivuni"],
    gitlabUser: "parul.sadasivuni",
    unitTests: "0",
  },
  {
    photo: "/photos/brianna_photo.jpeg",
    name: "Brianna Flores",
    role: "Full Stack Developer",
    bio: "Hello! I'm a junior studying Computer Science with a minor in Business. I currently serve as the Marketing Officer for the Hispanic Association of Computer Scientists (HACS) and am also a member of Longhorn Developers and TCUP. I also love to crochet and run a small business, StockysCrafts, where I sell handmade crochet plushies!",
    commitIds: ["Brianna-Flo"],
    gitlabUser: "Brianna-Flo",
    unitTests: "0",
  },
  {
    photo: "/photos/ali_photo.jpg",
    name: "Ali Novruzov",
    role: "Backend Developer",
    bio: "My name is Ali and I'm in my final year at UT. I recently completed an AI Engineering position with Fujitsu. In my free time I like to learn history and watch sci-fi movies. Travel is also something I find really fun.",
    commitIds: ["anovruzov"],
    gitlabUser: "anovruzov",
    unitTests: "0",
  },
  {
    photo: "/photos/jonathan_photo.jpg",
    name: "Jonathan Ho",
    role: "Full Stack Developer",
    bio: "Hi! My name is Jonathan Ho, and I'm currently a junior studying Computer Science and Business at UT Austin. Over the summer, I worked as a generative AI intern at Scale AI. In my free time, I enjoy playing basketball and absolutely nothing else.",
    commitIds: ["B4NAN4NA"],
    gitlabUser: "jnthnho",
    unitTests: "0",
  }
]

const About = () => {
  const [stats, setStats] = useState({});
  useEffect(() => {
    const projectId = 74738319;
    const perPage = 100;
    const fetchStats = async () => {
      try {
        const results = await Promise.all(
          team.map(async (member) => {
            /// Count commits across all commit names
            let totalCommits = 0;
            for (const commitId of member.commitIds) {
              let page = 1;
              let commitsPage;
              do {
                const res = await fetch(
                  `https://gitlab.com/api/v4/projects/${projectId}/repository/commits?per_page=${perPage}&page=${page}&author=${encodeURIComponent(commitId)}`
                );
                commitsPage = await res.json();
                totalCommits += commitsPage.length;
                page++;
              } while (commitsPage.length === perPage);
            }

            // Fetch all issues
            let allIssues = [];
            let page = 1;
            let issuesPage;
            do {
              const res = await fetch(
                `https://gitlab.com/api/v4/projects/${projectId}/issues?per_page=${perPage}&page=${page}`
              );
              issuesPage = await res.json();
              allIssues = [...allIssues, ...issuesPage];
              page++;
            } while (issuesPage.length === perPage);

            // Count issues created & closed by the member
            const createdIssues = allIssues.filter(
              (i) => i.author && i.author.username && i.author.username.toLowerCase().includes(member.gitlabUser.toLowerCase())
            );
            const closedIssues = allIssues.filter(
              (i) => i.closed_by && i.closed_by.username && i.closed_by.username.toLowerCase().includes(member.gitlabUser.toLowerCase())
            );

            return {
              [member.name]: {
                commits: totalCommits,
                issuesCreated: createdIssues.length,
                issuesClosed: closedIssues.length,
                unitTests: member.unitTests,
              },
            };
          })
        );

        const merged = results.reduce((acc, obj) => ({ ...acc, ...obj }), {});
        setStats(merged);
      } catch (err) {
        console.error("GitLab API error:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <NavigationBar />
      {/* Title section */}
      <div style={{ backgroundColor: "#f5f7f6", padding: "4rem 0" }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-4 fw-bold">Our Mission</h1>
              <p className="lead mt-3">
                SafeHavenConnect is a platform designed to help individuals
                struggling to find trustworthy, accessible, and local resources
                for safety, legal, medical, financial, and community support.
                Our goal is to connect users with verified organizations and
                events while providing platform that empowers them
                to take the next steps toward safety and recovery.
              </p>
              <p className="mt-3">
                <strong>Intended users:</strong> survivors of domestic violence,
                their families, allies, and community organizations seeking to
                share resources.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Team Section */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Our Team</h2>
        <Row>
          {team.map((member) => (
            <Col md={4} key={member.name} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <Image
                    src={member.photo}
                    roundedCircle
                    className="mb-3"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />
                  <h5 className="fw-bold">{member.name}</h5>
                  <p className="text-muted">{member.role}</p>
                  <p>{member.bio}</p>
                  {stats[member.name] ? (
                    <>
                      <p>
                        <strong>Commits:</strong>{" "}
                        {stats[member.name].commits}
                      </p>
                      <p>
                        <strong>Issues Created:</strong>{" "}
                        {stats[member.name].issuesCreated}
                      </p>
                      <p>
                        <strong>Issues Closed:</strong>{" "}
                        {stats[member.name].issuesClosed}
                      </p>
                      <p>
                        <strong>Unit Tests:</strong>{" "}
                        {stats[member.name].unitTests}
                      </p>
                    </>
                  ) : (
                    <Spinner animation="border" size="sm" />
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Tools Section */}
      <div style={{ backgroundColor: "#f5f7f6", padding: "3rem 0" }}>
        <Container>
          <h2 className="text-center mb-4">Tools We Used</h2>
          <ul>
            <li>
              <strong>React.js & Bootstrap:</strong> Frontend design and layout with reusable components.
            </li>
            <li>
              <strong>Vite:</strong> Fast development server and build tool for running and bundling the React app.
            </li>
            <li>
              <strong>GitLab:</strong> Version control, issues, and commit tracking.
            </li>
            <li>
              <strong>Postman:</strong> Used to design and document our API endpoints for SafeHavenConnect.
            </li>
            <li>
              <strong>Amazon Web Services (AWS):</strong> Hosting and deploying web services for our application.
            </li>
          </ul>
        </Container>
      </div>

      {/* Explore Section */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Explore More</h2>
        <Row className="g-4 justify-content-center">
          {/* GitLab Repository Card */}
          <Col md={4}>
            <Card className="h-100 shadow-sm text-center">
              <Card.Body>
                <Card.Title>GitLab Repository</Card.Title>
                <Card.Text>
                  Explore the full project repository, including code, commits, and issues.
                </Card.Text>
                <a
                  href="https://gitlab.com/parul.sadasivuni/cs373-fall-2025-55085_03"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                  style={{ backgroundColor: "#cde5d7", color: "#000000", border: "none" }}
                >
                  Visit GitLab
                </a>
              </Card.Body>
            </Card>
          </Col>

          {/* Postman API Collection Card */}
          <Col md={4}>
            <Card className="h-100 shadow-sm text-center">
              <Card.Body>
                <Card.Title>Postman API Collection</Card.Title>
                <Card.Text>
                  View our Postman workspace with all API endpoints and documentation.
                </Card.Text>
                <a
                  href="https://www.postman.com/karen-heckel-749077/group-3-workspace/overview"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                  style={{ backgroundColor: "#cde5d7", color: "#000000", border: "none" }}
                >
                  View API
                </a>
              </Card.Body>
            </Card>
          </Col>

          {/* Data Sources Card */}
          <Col md={4}>
            <Card className="h-100 shadow-sm text-center">
              <Card.Body>
                <Card.Title>Data Sources</Card.Title>
                <Card.Text className="mb-3">
                  Access the APIs that provide our data.
                </Card.Text>
                <a
                  href="https://apiportal.211.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary mb-2"
                  style={{ backgroundColor: "#cde5d7", color: "#000000", border: "none" }}
                >
                  211 National Data Platform
                </a>
                <br />
                <a
                  href="https://topapis.com/homeless-shelter-api/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary mb-2"
                  style={{ backgroundColor: "#cde5d7", color: "#000000", border: "none" }}
                >
                  Homeless Shelter API
                </a>
                <br />
                <a
                  href="https://www.eventbrite.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary mb-2"
                  style={{ backgroundColor: "#cde5d7", color: "#000000", border: "none" }}
                >
                  Eventbrite API
                </a>
                <br />
                <a
                  href="https://data.hrsa.gov/tools/web-services"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                  style={{ backgroundColor: "#cde5d7", color: "#000000", border: "none" }}
                >
                  Medical Centers API
                </a>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

    </>
  );
}

export default About;
