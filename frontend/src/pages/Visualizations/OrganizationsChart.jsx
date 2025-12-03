import { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as d3 from "d3";
import { Spinner } from "react-bootstrap";

const BACKEND_URL = "https://backend.safehavenconnect.me";

export default function OrganizationsChart() {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const svgRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    axios
      .get(`${BACKEND_URL}/api/organizations/all`)
      .then((res) => {
        if (!cancelled) setOrgs(res.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!orgs.length) return;

    const counts = d3
      .rollups(
        orgs,
        (v) => v.length,
        (d) => (d.location || "").split(",")[0] || "Unknown"
      )
      .map(([city, count]) => ({ city, count }));

    const sorted = counts.sort((a, b) => b.count - a.count);
    const topN = 20;
    const topCities = sorted.slice(0, topN);

    const width = 600;
    const height = 400;
    const radius = Math.min(width, height) / 2 - 40;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    d3.select("body").selectAll(".orgs-tooltip").remove();

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie().value((d) => d.count);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const colorPalette = [...d3.schemeTableau10, ...d3.schemeSet3];
    const color = d3
      .scaleOrdinal()
      .domain(topCities.map((d) => d.city))
      .range(colorPalette);

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "orgs-tooltip")
      .style("position", "absolute")
      .style("background", "white")
      .style("padding", "6px 10px")
      .style("border", "1px solid #ccc")
      .style("border-radius", "6px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    g.selectAll("path")
      .data(pie(topCities))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.city))
      .attr("stroke", "white")
      .style("stroke-width", 1.5)
      .on("mouseover", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(
            `<strong>${d.data.city}</strong><br>${d.data.count} organizations`
          );
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY + "px");
      })
      .on("mouseout", () => tooltip.style("opacity", 0));
  }, [orgs]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      {loading && !orgs.length && (
        <div className="d-flex justify-content-center align-items-center mb-2">
          <Spinner animation="border" role="status" size="sm" className="me-2">
            <span className="visually-hidden">Loading chart…</span>
          </Spinner>
          <span className="text-muted">Loading chart…</span>
        </div>
      )}

      <svg
        ref={svgRef}
        viewBox="0 0 600 400"
        style={{ width: "100%", height: "auto", display: "block" }}
      ></svg>
    </div>
  );
}
