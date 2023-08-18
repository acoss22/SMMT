import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import moment from "moment";
import styles from './analytics.module.scss';

const Analytics: React.FC = () => {
  const chartRef = useRef<SVGSVGElement | null>(null);
  const followerHistory = useSelector(
    (state: RootState) => state.followerHistory
  );

  useEffect(() => {
    // Data formatting
    const data = followerHistory.map(entry => ({
      timestamp: moment(entry.timestamp).toDate(),
      count: entry.count,
    }));

    // Chart dimensions
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const svg = d3.select(chartRef.current)
      .attr("width", width)
      .attr("height", height);

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.timestamp) as [Date, Date])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count) as number])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = (g: d3.Selection<SVGGElement, unknown, HTMLElement, any>) => {
      (g as d3.Selection<SVGGElement, unknown, HTMLElement, any>)
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));
    };

    const yAxis = (g: d3.Selection<SVGGElement, unknown, HTMLElement, any>) => {
      (g as d3.Selection<SVGGElement, unknown, HTMLElement, any>)
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove());
    };

    svg.append("g").call(xAxis as any);
    svg.append("g").call(yAxis as any);

    // Bars
    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.timestamp) - (width - margin.left - margin.right) / data.length / 2)
      .attr("y", d => y(d.count))
      .attr("width", (width - margin.left - margin.right) / data.length)
      .attr("height", d => Math.abs(y(0) - y(d.count)))
      .style("fill", "steelblue");

  }, [followerHistory]);

  return (
    <div className={styles["tab2-content"]}>
      <h2>Follower Count History</h2>
      <svg ref={chartRef}></svg>
    </div>
  );
};

export default Analytics;
