import { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as d3 from "d3";

const BACKEND_URL = "https://backend.safehavenconnect.me";

export default function ClinicsChart() {
    const [clinics, setClinics] = useState([]);
    const svgRef = useRef(null);

    useEffect(() => {
        let cancelled = false;

        const fetchAllClinics = async () => {
            try {
                let all = [];
                let page = 1;
                let totalPages = 1;

                while (page <= totalPages && !cancelled) {
                    const res = await axios.get(`${BACKEND_URL}/api/dev/clinics`, {
                        params: { page },
                    });

                    const data = res.data || {};
                    const pageClinics = data.clinics || [];

                    all = all.concat(pageClinics);

                    totalPages = data.num_pages || 1;
                    page += 1;
                }

                if (!cancelled) {
                    console.log("total clinics fetched:", all.length);
                    setClinics(all);
                }
            } catch (err) {
                console.error("Error fetching paginated dev clinics:", err);
            }
        };

        fetchAllClinics();

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (!clinics.length) return;

        const counts = d3
            .rollups(
                clinics,
                v => v.length,
                d => d.clinic_license_type || "Unknown"
            )
            .map(([type, count]) => ({ type, count }));

        const width = 700;
        const height = 380;
        const radius = Math.min(width, height) / 2 - 40;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const g = svg
            .append("g")
            .attr("transform", `translate(${width / 2 - 80}, ${height / 2})`);

        const color = d3
            .scaleOrdinal()
            .domain(counts.map(d => d.type))
            .range(d3.schemeTableau10);

        const pie = d3
            .pie()
            .sort(null)
            .value(d => d.count);

        const arc = d3
            .arc()
            .innerRadius(radius * 0.5)
            .outerRadius(radius);

        g.selectAll("path")
            .data(pie(counts))
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", d => color(d.data.type))
            .attr("stroke", "white")
            .attr("stroke-width", 1.5)
            .append("title")
            .text(d => `${d.data.type}: ${d.data.count} clinics`);


        const totalClinics = d3.sum(counts, d => d.count);
        g.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "-0.2em")
            .style("font-size", "18px")
            .style("font-weight", "bold")
            .text(totalClinics);

        g.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "1.2em")
            .style("font-size", "12px")
            .text("Total Clinics");

        const legend = svg
            .append("g")
            .attr("transform", `translate(${width - 180}, ${60})`);

        const legendRow = legend
            .selectAll(".legend-row")
            .data(counts)
            .enter()
            .append("g")
            .attr("class", "legend-row")
            .attr("transform", (_, i) => `translate(0, ${i * 24})`);

        legendRow
            .append("rect")
            .attr("width", 14)
            .attr("height", 14)
            .attr("rx", 3)
            .attr("ry", 3)
            .attr("fill", d => color(d.type));

        legendRow
            .append("text")
            .attr("x", 20)
            .attr("y", 11)
            .style("font-size", "12px")
            .text(d => `${d.type} (${d.count})`);
    }, [clinics]);

    return (
        <div>
            <svg ref={svgRef} width={700} height={380}></svg>
        </div>
    );
}
