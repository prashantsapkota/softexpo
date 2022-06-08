import React from "react";
export const Loading = ({ loading }) => (loading ? <div className="app-loader">
<svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" style={{ margin:"auto", background: "none", display: "block", shapeRendering: "auto"}} width="35px" height="35px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" >
<g transform="translate(50,50)">
  <g transform="scale(0.7)">
  <circle cx="0" cy="0" r="50" fill="#1d3f72"></circle>
  <circle cx="0" cy="-31" r="12" fill="#fcfeff">
    <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 0 0;360 0 0"></animateTransform>
  </circle>
  </g>
</g>
</svg>
</div> : null);
