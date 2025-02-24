import { useEffect, useState } from "react";
import React from "react";
import Logo from "../../assets/icon/tokenlogo.png";
import "./Preloader.css";

const Preloader = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (typeof onFinish === "function") {
        onFinish();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`preload-container ${visible ? "" : "hidden"}`}>
      <img className="preload-logo" src={Logo} alt="Logo" />
    </div>
  );
};

export default Preloader;
