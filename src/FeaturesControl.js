import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faUndo } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";

export default function FeaturesControl({
  handleCompareBefore,
  handleCompareAfter,
  handleReset,
}) {
  return (
    <>
      {/* Compare */}
      <button
        data-tooltip-id={"Compare"}
        data-tooltip-content={"Compare"}
        onMouseDown={handleCompareBefore}
        onMouseUp={handleCompareAfter}
        className="features-control-button"
      >
        <FontAwesomeIcon icon={faEye} />
      </button>
      <Tooltip id={"Compare"} className="tooltip" />

      {/* Reset */}
      <button
        data-tooltip-id={"Reset"}
        data-tooltip-content={"Reset"}
        onClick={handleReset}
        className="features-control-button"
      >
        <FontAwesomeIcon icon={faUndo} />
      </button>
      <Tooltip id={"Reset"} className="tooltip" />
    </>
  );
}
