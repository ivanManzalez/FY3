import React from "react";

const StandingIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height} 
    viewBox="0 0 24 24" 
    fill={props.fill ? props.fill : "none"}
    stroke={props.color}
    stroke-width="1.5" 
    stroke-linecap="round" 
    stroke-linejoin="round" 
    class="feather feather-server">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line>
  </svg>
);

export default StandingIcon;
