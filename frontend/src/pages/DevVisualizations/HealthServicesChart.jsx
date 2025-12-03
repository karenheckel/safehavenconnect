import { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as d3 from "d3";
import { Spinner } from "react-bootstrap";

const BACKEND_URL = "https://backend.safehavenconnect.me";

export default function HealthServicesChart() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const svgRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const fetchAllServices = async () => {
      try {
        let all = [];
        let page = 1;
        let totalPages = 1;

        while (page <= totalPages && !cancelled) {
          const res = await axios.get(`${BACKEND_URL}/api/dev/services`, {
            params: { page },
          });

          const data = res.data || {};
          const pageServices = data.health_services || [];

          all = all.concat(pageServices);

          totalPages = data.num_pages || 1;
          page += 1;
        }

        if (!cancelled) {
          console.log("total services fetched:", all.length);
          setServices(all);
        }
      } catch (err) {
        console.error("Error fetching paginated dev health services:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAllServices();

    return () => {
      cancelled = true;
    };
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
      .sort((a, b) => b.count - a.count);

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
  }, [services]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      {loading && !services.length && (
        <div className="d-flex justify-content-center align-items-center mb-2">
          <Spinner animation="border" role="status" size="sm" className="me-2">
            <span className="visually-hidden">Loading chart…</span>
          </Spinner>
          <span className="text-muted">Loading chart…</span>
        </div>
      )}

      <svg
        ref={svgRef}
        viewBox="0 0 700 380"
        style={{ width: "100%", height: "auto", display: "block" }}
      ></svg>
    </div>
  );
}
