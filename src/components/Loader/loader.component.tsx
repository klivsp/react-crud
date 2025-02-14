import React from "react";
import "./loader.style.css";

interface LoaderProps {
  message: string;
}

const Loader = ({ message }: LoaderProps) => {
  return (
    <div className="loader-overlay">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default Loader;
