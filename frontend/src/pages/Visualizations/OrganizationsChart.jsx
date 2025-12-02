import { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as d3 from "d3";

const BACKEND_URL = "https://backend.safehavenconnect.me";

export default function OrganizationsChart() {
  const [orgs, setOrgs] = useState([]);
  const svgRef = useRef(null);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/organizations/all`)
      .then(res => setOrgs(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (!orgs.length) return;

    const counts = d3.rollups(
      orgs,
      v => v.length,
      d => d.location.split(",")[0]
    ).map(([city, count]) => ({ city, count }));

    // 2. Sort and split top 20 + others
    const sorted = counts.sort((a, b) => b.count - a.count);
    const topN = 20;
    const topCities = sorted.slice(0, topN);
   
    const width = 600;
    const height = 400;
    const radius = Math.min(width, height) / 2 - 40;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie().value(d => d.count);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const colorPalette = [
        ...d3.schemeTableau10,
        ...d3.schemeSet3,
      ];
      const color = d3.scaleOrdinal()
        .domain(topCities.map(d => d.city))
        .range(colorPalette);
      

    const tooltip = d3.select("body")
      .append("div")
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
      .attr("fill", d => color(d.data.city))
      .attr("stroke", "white")
      .style("stroke-width", 1.5)
      .on("mouseover", (event, d) => {
        tooltip.style("opacity", 1)
          .html(`<strong>${d.data.city}</strong><br>${d.data.count} organizations`);
      })
      .on("mousemove", (event) => {
        tooltip.style("left", event.pageX + 10 + "px")
               .style("top", event.pageY + "px");
      })
      .on("mouseout", () => tooltip.style("opacity", 0));

    g.selectAll("text")
      .data(pie(topCities))
      .enter()
      .append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", d => d.data.count > 5 ? "10px" : "0px")
      .text(d => d.data.city);

    svg.append("text")
      .attr("x", width/2)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text("Top 20 Cities with the Most Organizations");

  }, [orgs]);

  return <svg ref={svgRef}></svg>;
}
