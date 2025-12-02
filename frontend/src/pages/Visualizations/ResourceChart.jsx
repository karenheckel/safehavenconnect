import { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as d3 from "d3";

const BACKEND_URL = "https://backend.safehavenconnect.me";

export default function ResourceChart() {
  const [resources, setResources] = useState([]);
  const svgRef = useRef(null);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/resources/all`)
      .then(res => setResources(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (!resources.length) return;

    const counts = d3.rollups(
        resources,
        v => v.length,
        d => {
          const parts = d.location.split(",");
          return parts.length >= 2 ? parts.slice(-2).join(",").trim() : d.location;
        }
      )
    .map(([location, count]) => ({ location, count }))
    .sort((a, b) => b.count - a.count);

    const width = 800;
    const height = 500;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const root = d3.pack()
      .size([width, height - 40])
      .padding(10)(
        d3.hierarchy({ children: counts })
          .sum(d => d.count)
      );

    const color = d3.scaleOrdinal()
      .domain(counts.map(d => d.location))
      .range(d3.schemeSet3);

    const tooltip = d3.select("body")
      .append("div")
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
      .attr("transform", d => `translate(${d.x},${d.y + 40})`);

    node.append("circle")
      .attr("r", d => d.r)
      .attr("fill", d => color(d.data.location))
      .attr("stroke", "#555")
      .attr("stroke-width", 1.5)
      .on("mouseover", function (event, d) {
        tooltip.style("opacity", 1)
          .html(`
            <strong>${d.data.location}</strong><br/>
            ${d.data.count} resources
          `);
      })
      .on("mousemove", function (event) {
        tooltip.style("left", event.pageX + 15 + "px")
               .style("top", event.pageY + "px");
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

    node.append("text")
      .style("text-anchor", "middle")
      .style("font-size", d => (d.r > 30 ? "12px" : "0px"))
      .style("pointer-events", "none")
      .text(d => d.data.location.split(",")[0]);

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .style("font-weight", "bold")
      .text("Resource Availability by Location");

  }, [resources]);

  return <svg ref={svgRef} width={800} height={500}></svg>;
}
