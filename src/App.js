import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import "./App.css";
import FeaturesControl from "./FeaturesControl";
import ImageManager from "./ImageManager";
import Slider from "./Slider";
import Features from "./Features";

import {
  faSun,
  faAdjust,
  faFillDrip,
  faTintSlash,
  faRainbow,
  faExchangeAlt,
  faLowVision,
  faCameraRetro,
  faWater,
} from "@fortawesome/free-solid-svg-icons";

const FEATURES = [
  {
    name: "Brightness",
    icon: faSun,
    property: "brightness",
    initial: 100,
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  {
    name: "Contrast",
    icon: faAdjust,
    property: "contrast",
    initial: 100,
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  {
    name: "Saturation",
    icon: faFillDrip,
    property: "saturate",
    initial: 100,
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  {
    name: "Grayscale",
    icon: faTintSlash,
    property: "grayscale",
    initial: 0,
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  {
    name: "Hue Rotate",
    icon: faRainbow,
    property: "hue-rotate",
    initial: 0,
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  {
    name: "Invert",
    icon: faExchangeAlt,
    property: "invert",
    initial: 0,
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  {
    name: "Opacity",
    icon: faLowVision,
    property: "opacity",
    initial: 100,
    value: 100,
    min: 0,
    max: 100,
    unit: "%",
  },
  {
    name: "Sepia",
    icon: faCameraRetro,
    property: "sepia",
    initial: 0,
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  {
    name: "Blur",
    icon: faWater,
    property: "blur",
    initial: 0,
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },
];

function App() {
  const [features, setFeatures] = useState(FEATURES);
  const [currFeature, setCurrFeature] = useState(0);
  const [showDefault, setShowDefault] = useState(false);
  const [image, setImage] = useState(null);
  const imageRef = useRef(null);

  function handleCompareBefore() {
    setShowDefault(true);
  }

  function handleCompareAfter() {
    setShowDefault(false);
  }

  function handleReset() {
    setFeatures((prevFeatures) => {
      const newFeatures = [...prevFeatures];
      newFeatures.forEach((feature) => {
        feature.value = feature.initial;
      });
      return newFeatures;
    });
  }

  function getImageStyle() {
    let style;

    if (showDefault) {
      style = features.map((feature) => {
        return `${feature.property}(${feature.initial}${feature.unit})`;
      });
    } else {
      style = features.map((feature) => {
        return `${feature.property}(${feature.value}${feature.unit})`;
      });
    }
    return {
      filter: style.join(" "),
    };
  }

  function handleUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }

    handleReset();
  }

  async function handleSave() {
    if (!image) {
      alert("Please upload an image first!");
      return;
    }

    const imageElement = imageRef.current;
    if (imageElement) {
      const png = await toPng(imageElement);
      const link = document.createElement("a");
      link.href = png;
      link.download = "edited-image.png";
      link.click();
    }
  }

  function handleSliderChange(event) {
    setFeatures((prevFeatures) => {
      const newFeatures = [...prevFeatures];
      newFeatures[currFeature].value = event.target.value;
      return newFeatures;
    });
  }

  return (
    <div className="body-div">
      <h1>Photo Editor</h1>
      <div className="main-div">
        <div className="control features-control">
          <FeaturesControl
            handleCompareBefore={handleCompareBefore}
            handleCompareAfter={handleCompareAfter}
            handleReset={handleReset}
          />
        </div>

        <div className="image-div">
          {image && (
            <img
              src={image}
              ref={imageRef}
              alt="Uploaded"
              style={getImageStyle()}
              className="image"
            />
          )}
        </div>

        <div className="control image-manager">
          <ImageManager handleUpload={handleUpload} handleSave={handleSave} />
        </div>

        <Slider
          value={features[currFeature].value}
          min={features[currFeature].min}
          max={features[currFeature].max}
          icon={features[currFeature].icon}
          handleChange={handleSliderChange}
        />

        <div className="features">
          {features.map((feature, index) => {
            return (
              <Features
                key={index}
                name={feature.name}
                icon={feature.icon}
                active={index === currFeature}
                handleClick={() => setCurrFeature(index)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
