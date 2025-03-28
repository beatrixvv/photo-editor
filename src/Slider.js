import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Slider({ value, min, max, icon, handleChange }) {
  const iconRef = useRef(null);
  const [iconSize, setIconSize] = useState(0);

  useEffect(() => {
    if (iconRef.current) {
      setIconSize(iconRef.current.getBoundingClientRect().width);
    }
  }, [icon]);

  return (
    <div className="slider-div">
      <input
        type="range"
        className="slider"
        value={value}
        min={min}
        max={max}
        onChange={handleChange}
      />
      <div
        className="slider-thumb-icon"
        style={{
          left: `calc(${((value - min) / (max - min)) * 50 + 25}% - ${
            iconSize / 2
          }px)`,
        }}
      >
        <FontAwesomeIcon icon={icon} ref={iconRef} />
      </div>
    </div>
  );
}
