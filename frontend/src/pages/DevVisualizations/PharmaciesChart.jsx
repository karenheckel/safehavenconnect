import { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as d3 from "d3";

const BACKEND_URL = "https://backend.safehavenconnect.me";

export default function PharmaciesChart() {
  const [pharmacies, setPharmacies] = useState([]);
  const svgRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const fetchAll = async () => {
      try {
        let all = [];
        let page = 1;
        let totalPages = 1;

        while (page <= totalPages && !cancelled) {
          const res = await axios.get(`${BACKEND_URL}/api/dev/pharmacies`, {
            params: { page },
          });

          const data = res.data || {};
          const batch = data.pharmacies || [];

          all = all.concat(batch);
          totalPages = data.num_pages || 1;
          page += 1;
        }

        if (!cancelled) {
          console.log("Fetched pharmacies:", all.length);
          setPharmacies(all);
        }
      } catch (err) {
        console.error("Error fetching pharmacies:", err);
      }
    };

    fetchAll();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!pharmacies.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 500;

    d3.select("body").selectAll(".pharm-tooltip").remove();

    const stripZip5 = (zip) => {
      if (!zip) return "Unknown";
      const base = zip.split("-")[0].trim();
      return base || "Unknown";
    };

    const counts = d3
      .rollups(
        pharmacies,
        v => v.length,
        d => stripZip5(d.pharmacy_zip)
      )
      .map(([zip, count]) => ({ zip, count }))
      .sort((a, b) => b.count - a.count);

    const root = d3
      .pack()
      .size([width, height - 40])
      .padding(10)(
        d3
          .hierarchy({ children: counts })
          .sum(d => d.count)
      );

    const color = d3
      .scaleOrdinal()
      .domain(counts.map(d => d.zip))
      .range(d3.schemeSet3);

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "pharm-tooltip")
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

    node
      .append("circle")
      .attr("r", d => d.r)
      .attr("fill", d => color(d.data.zip))
      .attr("stroke", "#555")
      .attr("stroke-width", 1.5)
      .on("mouseover", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(
            `<strong>ZIP: ${d.data.zip}</strong><br/>${d.data.count} pharmacies`
          );
      })
      .on("mousemove", event => {
        tooltip
          .style("left", event.pageX + 15 + "px")
          .style("top", event.pageY + "px");
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });
      
  }, [pharmacies]);

  return <svg ref={svgRef} width={800} height={500}></svg>;
}
