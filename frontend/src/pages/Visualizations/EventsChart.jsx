import { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as d3 from "d3";
import { Spinner } from "react-bootstrap";

const BACKEND_URL = "https://backend.safehavenconnect.me";

export default function EventsChart() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const svgRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    axios
      .get(`${BACKEND_URL}/api/events/all`)
      .then((res) => {
        if (!cancelled) setEvents(res.data || []);
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
    if (!events?.length) return;

    const counts = d3.rollups(events, v => v.length, d => d.event_type || "Unknown");
    const sortedCounts = counts.sort((a, b) => b[1] - a[1]);

    const width = 650;
    const height = 380;
    const margin = { top: 40, right: 20, bottom: 80, left: 60 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const x = d3.scaleBand()
      .domain(sortedCounts.map(d => d[0]))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(sortedCounts, d => d[1])])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const color = d3.scaleOrdinal()
      .domain(sortedCounts.map(d => d[0]))
      .range(d3.schemeSet2);

    // Bars
    svg.selectAll("rect")
      .data(sortedCounts)
      .enter()
      .append("rect")
      .attr("x", d => x(d[0]))
      .attr("y", d => y(d[1]))
      .attr("width", x.bandwidth())
      .attr("height", d => y(0) - y(d[1]))
      .attr("fill", d => color(d[0]));

    // Labels on bars
    svg.selectAll("text.bar-label")
      .data(sortedCounts)
      .enter()
      .append("text")
      .attr("class", "bar-label")
      .attr("x", d => x(d[0]) + x.bandwidth() / 2)
      .attr("y", d => y(d[1]) - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#222")
      .text(d => d[1]);

    // X Axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-35)")
      .style("text-anchor", "end")
      .style("font-size", "12px");

    // Y Axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, [events]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "650px",
        margin: "0 auto",
      }}
    >
      {loading && !events.length && (
        <div className="d-flex justify-content-center align-items-center mb-2">
          <Spinner animation="border" role="status" size="sm" className="me-2">
            <span className="visually-hidden">Loading chart…</span>
          </Spinner>
          <span className="text-muted">Loading chart…</span>
        </div>
      )}

      <svg
        ref={svgRef}
        viewBox="0 0 650 380"
        style={{ width: "100%", height: "auto", display: "block" }}
      ></svg>
    </div>
  );
}
