import React from "react";

const BarChartIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={props.width}
    height={props.height} 
    viewBox="0 0 24 24" 
    fill={props.fill}
    stroke={props.color} 
    stroke-width="1.5" 
    stroke-linecap="round" 
    stroke-linejoin="round" 
    class="feather feather-bar-chart">
      <line x1="12" y1="20" x2="12" y2="10"></line>
      <line x1="18" y1="20" x2="18" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="16"></line>
    </svg>
);

export default BarChartIcon;
