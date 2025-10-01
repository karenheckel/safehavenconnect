import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { Container, Row, Col, Card, Image, Spinner } from "react-bootstrap";


/* Team list */
const team = [
  {
    photo: "/src/assets/photos/karen_photo.jpg",
    name: "Karen Heckel",
    role: "Frontend Developer",
    bio: "I am a junior majoring in Computer Science. Currently, I am an Undergraduate Research Assistant at TACC and the Academic officer for HACS. Outside of school, I enjoy thrifting and watching movies!",
    gitlabUser: "karenheckel",
    unitTests: "0",
  },
  {
    photo: "/src/assets/photos/parul_photo.jpeg",
    name: "Parul Sadasivuni",
    role: "Full Stack Developer",
    bio: "My name is Parul and I'm a junior in Computer Science and Business here at UT. I'm a research assistant with Dr. Caleb Kwon in the McCombs School of Business studying the impacts of minimum wage shocks on employment. In my free time, I enjoy music and watching Longhorn sports!",
    gitlabUser: "parul.sadasivuni",
    unitTests: "0",
  },
  {
    photo: "/src/assets/photos/brianna_photo.jpeg",
    name: "Brianna Flores",
    role: "Full Stack Developer",
    bio: "Hello! I'm a junior studying Computer Science with a minor in Business. I currently serve as the Marketing Officer for the Hispanic Association of Computer Scientists (HACS) and am also a member of Longhorn Developers and TCUP. I also love to crochet and run a small business, StockysCrafts, where I sell handmade crochet plushies!",
    gitlabUser: "Brianna-Flo",
    unitTests: "0",
  },
  {
    photo: "/src/assets/photos/ali_photo.jpg",
    name: "Ali Novruzov",
    role: "Backend Developer",
    bio: "My name is Ali and I'm in my final year at UT. I recently completed an AI Engineering position with Fujitsu. In my free time I like to learn history and watch sci-fi movies. Travel is also something I find really fun.",
    gitlabUser: "anovruzov",
    unitTests: "0",
  },
  {
    photo: "/src/assets/photos/jonathan_photo.jpg",
    name: "Jonathan Ho",
    role: "Full Stack Developer",
    bio: "Hi! My name is Jonathan Ho, and I'm currently a junior studying Computer Science and Business at UT Austin. Over the summer, I worked as a generative AI intern at Scale AI. In my free time, I enjoy playing basketball and absolutely nothing else.",
    gitlabUser: "jnthnho",
    unitTests: "0",
  }
]

const About = () => {
  const [stats, setStats] = useState({});
  useEffect(() => {
    const headers = { "PRIVATE-TOKEN": "glpat-MGE7TmTfZz7_pZfDw47Azm86MQp1Omk5NTgxCw.01.1210g8o90" };
    const projectId = 74738319;
    const fetchStats = async () => {
      try {
        const results = await Promise.all(
          team.map(async (member) => {
            // Fetch commits
            const commitsRes = await fetch(
              `https://gitlab.com/api/v4/projects/${projectId}/repository/commits?per_page=100`,
              { headers }
            );
            const commits = await commitsRes.json();
            const userCommits = commits.filter(
              (c) => c.author_name.toLowerCase().includes(member.gitlabUser.toLowerCase())
            );
  
            // Fetch issues
            const issuesRes = await fetch(
              `https://gitlab.com/api/v4/projects/${projectId}/issues?state=closed&per_page=100`,
              { headers }
            );
            const issues = await issuesRes.json();
            const userIssues = issues.filter(
              (i) => i.closed_by && i.closed_by.username === member.gitlabUser
            );
    
            return {
              [member.gitlabUser]: {
                commits: userCommits.length,
                issues: userIssues.length,
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
      <NavBar />
      {/* Title section */}
      <div style={{ backgroundColor: "#f5f7f6", padding: "4rem 0" }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-4 fw-bold">About SafeHavenConnect</h1>
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
                  {stats[member.gitlabUser] ? (
                    <>
                      <p>
                        <strong>Commits:</strong>{" "}
                        {stats[member.gitlabUser].commits}
                      </p>
                      <p>
                        <strong>Issues:</strong>{" "}
                        {stats[member.gitlabUser].issues}
                      </p>
                      <p>
                        <strong>Unit Tests:</strong>{" "}
                        {stats[member.gitlabUser].unitTests}
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
              <strong>React.js & Bootstrap:</strong> Frontend design and layout
              with reusable components.
            </li>
            <li>
              <strong>Vite:</strong> Fast development server and build tool for running and bundling the React app.
            </li>
            <li>
              <strong>GitLab:</strong> Version control, issues, and commit
              tracking.
            </li>
            <li>
              <strong>Postman:</strong> API testing and documentation.
            </li>
          </ul>
        </Container>
      </div>

      {/* Links Section */}
      <Container className="my-5 text-center">
        <h2 className="mb-3">Explore More</h2>
        <p>
          <a href="https://gitlab.com/parul.sadasivuni/cs373-fall-2025-55085_03" target="_blank" rel="noreferrer">
            GitLab Repository
          </a>
        </p>
        <p>
          <a href="https://www.postman.com/<api>" target="_blank" rel="noreferrer">
            Postman API Collection
          </a>
        </p>
        <p>
          <a
            href="https://apiportal.211.org/"
            target="_blank"
            rel="noreferrer"
          >
            211 National Data Platform
          </a>
        </p>
        <p>
          <a
            href="https://topapis.com/homeless-shelter-api/"
            target="_blank"
            rel="noreferrer"
          >
            Homeless Shelter API
          </a>
          </p>
        <p>
          <a
            href="https://data.hrsa.gov/tools/web-services"
            target="_blank"
            rel="noreferrer"
          >
            Medical Centers API
          </a>
        </p>
        
      </Container>
    </>
  );
};

export default About;