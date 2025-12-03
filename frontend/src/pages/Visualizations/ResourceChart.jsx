import { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as d3 from "d3";
import { Spinner } from "react-bootstrap";

const BACKEND_URL = "https://backend.safehavenconnect.me";

export default function ResourceChart() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const svgRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    axios
      .get(`${BACKEND_URL}/api/resources/all`)
      .then((res) => {
        if (!cancelled) setResources(res.data || []);
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
    if (!resources.length) return;

    const counts = d3
      .rollups(
        resources,
        (v) => v.length,
        (d) => {
          const loc = d.location || "";
          const parts = loc.split(",");
          return parts.length >= 2
            ? parts.slice(-2).join(",").trim()
            : loc || "Unknown";
        }
      )
      .map(([location, count]) => ({ location, count }))
      .sort((a, b) => b.count - a.count);

    const width = 800;
    const height = 500;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    d3.select("body").selectAll(".resource-tooltip").remove();

    const root = d3
      .pack()
      .size([width, height - 40])
      .padding(10)(
        d3
          .hierarchy({ children: counts })
          .sum((d) => d.count)
      );

    const color = d3
      .scaleOrdinal()
      .domain(counts.map((d) => d.location))
      .range(d3.schemeSet3);

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "resource-tooltip")
      .style("position", "absolute")
      .style("background", "white")
      .style("padding", "8px 12px")
      .style("border", "1px solid #ccc")
      .style("border-radius", "6px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    const node = svg
      .selectAll("g")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x},${d.y + 40})`);

    node
      .append("circle")
      .attr("r", (d) => d.r)
      .attr("fill", (d) => color(d.data.location))
      .attr("stroke", "#555")
      .attr("stroke-width", 1.5)
      .on("mouseover", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(
            `<strong>${d.data.location}</strong><br/>${d.data.count} resources`
          );
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", event.pageX + 15 + "px")
          .style("top", event.pageY + "px");
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

    node
      .append("text")
      .style("text-anchor", "middle")
      .style("font-size", (d) => (d.r > 30 ? "12px" : "0px"))
      .style("pointer-events", "none")
      .text((d) => d.data.location.split(",")[0]);
  }, [resources]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      {loading && !resources.length && (
        <div className="d-flex justify-content-center align-items-center mb-2">
          <Spinner animation="border" role="status" size="sm" className="me-2">
            <span className="visually-hidden">Loading chart…</span>
          </Spinner>
          <span className="text-muted">Loading chart…</span>
        </div>
      )}

      <svg
        ref={svgRef}
        viewBox="0 0 800 500"
        style={{ width: "100%", height: "auto", display: "block" }}
      ></svg>
    </div>
  );
}
