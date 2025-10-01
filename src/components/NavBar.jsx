import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar navbar-light" style={{ backgroundColor: "#cde5d7" }}>
      <div
        className="d-flex justify-content-between align-items-center mx-3"
        style={{ width: "100%" }}
      >
        <a className="navbar-brand" href="#">
          SafeHavenConnect
        </a>
        <div>
          <ul className="nav d-flex flex-row mb-2 gap-3 align-items-center navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/events">
                Events
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/organizations">
                Organizations
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/resources">
                Resources
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
