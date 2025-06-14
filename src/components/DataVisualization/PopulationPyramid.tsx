import React, { useEffect, useRef } from 'react';

interface PopulationPyramidProps {
  data: { ageGroup: string; male: number; female: number }[];
  width?: number;
  height?: number;
}

const PopulationPyramid: React.FC<PopulationPyramidProps> = ({ data, width = 600, height = 400 }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data || data.length === 0) return;
    const svg = svgRef.current;
    if (!svg) return;
    // Clear previous
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const margin = { top: 30, right: 30, bottom: 40, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Find max value for scaling
    const maxValue = Math.max(
      ...data.map(d => Math.max(d.male, d.female))
    );

    // Y scale (age groups)
    const yStep = chartHeight / data.length;

    // X scale (population, both sides)
    const xScale = (value: number) => (value / maxValue) * (chartWidth / 2);

    // Draw axis lines
    const axis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    axis.setAttribute('x1', String(width / 2));
    axis.setAttribute('x2', String(width / 2));
    axis.setAttribute('y1', String(margin.top));
    axis.setAttribute('y2', String(height - margin.bottom));
    axis.setAttribute('stroke', '#888');
    axis.setAttribute('stroke-width', '2');
    svg.appendChild(axis);

    // Draw bars
    data.forEach((d, i) => {
      const y = margin.top + i * yStep;
      // Male (left, blue)
      const maleBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      maleBar.setAttribute('x', String(width / 2 - xScale(d.male)));
      maleBar.setAttribute('y', String(y));
      maleBar.setAttribute('width', String(xScale(d.male)));
      maleBar.setAttribute('height', String(yStep * 0.8));
      maleBar.setAttribute('fill', '#2196f3');
      svg.appendChild(maleBar);
      // Female (right, pink)
      const femaleBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      femaleBar.setAttribute('x', String(width / 2));
      femaleBar.setAttribute('y', String(y));
      femaleBar.setAttribute('width', String(xScale(d.female)));
      femaleBar.setAttribute('height', String(yStep * 0.8));
      femaleBar.setAttribute('fill', '#e91e63');
      svg.appendChild(femaleBar);
      // Age group label
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', String(width / 2));
      label.setAttribute('y', String(y + yStep * 0.6));
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('font-size', '12');
      label.textContent = d.ageGroup;
      svg.appendChild(label);
    });
    // X axis labels
    [maxValue, Math.floor(maxValue / 2), 0].forEach((val, i) => {
      // Left (male)
      const x = width / 2 - xScale(val);
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', String(x));
      label.setAttribute('y', String(height - margin.bottom + 15));
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('font-size', '12');
      label.textContent = val.toLocaleString();
      svg.appendChild(label);
      // Right (female)
      if (val !== 0) {
        const x2 = width / 2 + xScale(val);
        const label2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label2.setAttribute('x', String(x2));
        label2.setAttribute('y', String(height - margin.bottom + 15));
        label2.setAttribute('text-anchor', 'middle');
        label2.setAttribute('font-size', '12');
        label2.textContent = val.toLocaleString();
        svg.appendChild(label2);
      }
    });
    // Axis labels
    const maleLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    maleLabel.setAttribute('x', String(width / 4));
    maleLabel.setAttribute('y', String(margin.top - 10));
    maleLabel.setAttribute('text-anchor', 'middle');
    maleLabel.setAttribute('font-size', '14');
    maleLabel.textContent = 'Male';
    svg.appendChild(maleLabel);
    const femaleLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    femaleLabel.setAttribute('x', String((width * 3) / 4));
    femaleLabel.setAttribute('y', String(margin.top - 10));
    femaleLabel.setAttribute('text-anchor', 'middle');
    femaleLabel.setAttribute('font-size', '14');
    femaleLabel.textContent = 'Female';
    svg.appendChild(femaleLabel);
  }, [data, width, height]);

  return (
    <div style={{ textAlign: 'center', background: '#f9f9f9', borderRadius: 8, padding: 16, marginBottom: 24 }}>
      <svg ref={svgRef} width={width} height={height} />
    </div>
  );
};

export default PopulationPyramid;
