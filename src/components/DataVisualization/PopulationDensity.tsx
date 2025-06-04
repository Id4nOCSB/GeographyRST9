import React from 'react';
import * as d3 from 'd3';
import './PopulationDensity.css';

interface PopulationData {
  region: string;
  density: number;
}

interface PopulationDensityProps {
  data: PopulationData[];
  title?: string;
}

class PopulationDensity extends React.Component<PopulationDensityProps> {
  private svgRef = React.createRef<SVGSVGElement>();
  private chartWidth = 600;
  private chartHeight = 400;
  private margin = { top: 30, right: 30, bottom: 70, left: 60 };

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  drawChart() {
    const { data } = this.props;
    if (!data || data.length === 0) return;

    const svg = d3.select(this.svgRef.current);
    svg.selectAll("*").remove();

    const width = this.chartWidth - this.margin.left - this.margin.right;
    const height = this.chartHeight - this.margin.top - this.margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

    // X axis
    const x = d3.scaleBand()
      .domain(data.map(d => d.region))
      .range([0, width])
      .padding(0.2);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Y axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.density) || 0])
      .range([height, 0]);

    g.append("g")
      .call(d3.axisLeft(y));

    // Add bars
    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.region) || 0)
      .attr("y", d => y(d.density))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.density))
      .attr("fill", "#4CAF50")
      .on("mouseover", function(event, d) {
        d3.select(this).attr("fill", "#81C784");

        g.append("text")
          .attr("class", "tooltip")
          .attr("x", x(d.region) || 0 + x.bandwidth() / 2)
          .attr("y", y(d.density) - 10)
          .attr("text-anchor", "middle")
          .text(`${d.density} people/km²`);
      })
      .on("mouseout", function() {
        d3.select(this).attr("fill", "#4CAF50");
        g.selectAll(".tooltip").remove();
      });

    // Add title
    svg.append("text")
      .attr("x", this.chartWidth / 2)
      .attr("y", this.margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text(this.props.title || "Population Density by Region");

    // Add Y axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", this.margin.left / 3)
      .attr("x", -(this.chartHeight / 2))
      .attr("text-anchor", "middle")
      .text("Population Density (people/km²)");
  }

  render() {
    return (
      <div className="population-density-chart">
        <svg 
          ref={this.svgRef} 
          width={this.chartWidth} 
          height={this.chartHeight}
        />
      </div>
    );
  }
}

export default PopulationDensity;