import { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as d3 from "d3";

export default function DevHealthServicesChart() {
  const [services, setServices] = useState([]);
  const svgRef = useRef(null);

  useEffect(() => {
    axios
      .get("/api/dev/services", { params: { page: 1 } })
      .then(res => {
        setServices(res.data.health_services || []);
      })
      .catch(err => {
        console.error("Error fetching dev health services:", err);
      });
  }, []);

  useEffect(() => {
    if (!services.length) return;

    const counts = d3
      .rollups(
        services,
        v => v.length,
        d => d.zip_code || "Unknown"
      )
      .map(([zip, count]) => ({ zip, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

    const width = 700;
    const height = 380;
    const margin = { top: 40, right: 20, bottom: 80, left: 60 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const x = d3
      .scaleBand()
      .domain(counts.map(d => d.zip))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(counts, d => d.count)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .selectAll("rect")
      .data(counts)
      .enter()
      .append("rect")
      .attr("x", d => x(d.zip))
      .attr("y", d => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", d => y(0) - y(d.count))
      .attr("fill", "steelblue");

    svg
      .selectAll("text.bar-label")
      .data(counts)
      .enter()
      .append("text")
      .attr("class", "bar-label")
      .attr("x", d => x(d.zip) + x.bandwidth() / 2)
      .attr("y", d => y(d.count) - 4)
      .attr("text-anchor", "middle")
      .style("font-size", "11px")
      .text(d => d.count);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-35)")
      .style("text-anchor", "end")
      .style("font-size", "11px");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text("Developer Health Services per ZIP Code");
  }, [services]);

  return (
    <div>
      <svg ref={svgRef} width={700} height={380}></svg>
    </div>
  );
}
