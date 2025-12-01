import { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as d3 from "d3";
const BACKEND_URL = "https://backend.safehavenconnect.me";

export default function EventsChart() {
    const [events, setEvents] = useState([])
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/events/all`)
          .then(res => setEvents(res.data))
          .catch(err => console.error(err));
      }, []);
      
  const svgRef = useRef(null);

  useEffect(() => {
    if (!events || events.length === 0) return;

    const counts = d3.rollups(
      events,
      v => v.length,
      d => d.category
    );

    const sortedCounts = counts.sort((a, b) => b[1] - a[1]);

    const svg = d3.select(svgRef.current);
    const width = 600;
    const height = 350;
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };

    svg.selectAll("*").remove();

    const x = d3
      .scaleBand()
      .domain(sortedCounts.map(d => d[0]))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(sortedCounts, d => d[1])])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .selectAll("rect")
      .data(sortedCounts)
      .enter()
      .append("rect")
      .attr("x", d => x(d[0]))
      .attr("y", d => y(d[1]))
      .attr("width", x.bandwidth())
      .attr("height", d => y(0) - y(d[1]))
      .attr("fill", "#69b3a2");

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-30)")
      .style("text-anchor", "end");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

  }, [events]);

  return <svg ref={svgRef} width={600} height={350}></svg>;
}