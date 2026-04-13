import React from "react";
import "../style/loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <svg className="pl" viewBox="0 0 240 240">
        <circle
          className="pl__ring pl__ring--a"
          cx="120"
          cy="120"
          r="105"
        ></circle>

        <circle
          className="pl__ring pl__ring--b"
          cx="120"
          cy="120"
          r="35"
        ></circle>

        <circle
          className="pl__ring pl__ring--c"
          cx="85"
          cy="120"
          r="70"
        ></circle>

        <circle
          className="pl__ring pl__ring--d"
          cx="155"
          cy="120"
          r="70"
        ></circle>
      </svg>
    </div>
  );
};

export default Loader;