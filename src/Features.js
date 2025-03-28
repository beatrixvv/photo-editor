import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "react-tooltip";

export default function Features({ name, icon, active, handleClick }) {
  return (
    <>
      <button
        data-tooltip-id={name}
        data-tooltip-content={name}
        onClick={handleClick}
        className={`features-button ${active ? "active" : ""}`}
      >
        <FontAwesomeIcon icon={icon} />
      </button>
      <Tooltip id={name} className="tooltip" />
    </>
  );
}
