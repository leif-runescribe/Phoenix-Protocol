'use client'
import React, { useEffect } from "react";

const PixelTrail: React.FC = () => {
  useEffect(() => {
    const trailContainer = document.createElement("div");
    trailContainer.style.position = "fixed";
    trailContainer.style.pointerEvents = "none";
    trailContainer.style.top = "0";
    trailContainer.style.left = "0";
    trailContainer.style.width = "100vw";
    trailContainer.style.height = "100vh";
    
    document.body.appendChild(trailContainer);

    const createTrail = (x: number, y: number) => {
      const trail = document.createElement("div");
      trail.style.position = "absolute";
      trail.style.width = "50px";
      trail.style.height = "50px";
      trail.style.backgroundColor = "#C57D00";  // Medium Dark Amber
      trail.style.borderRadius = "2px";
      trail.style.transform = `translate(${x}px, ${y}px)`;
      trail.style.opacity = "1";
      const size = Math.random() * 30 + 10; // Random size between 10px and 40px
trail.style.width = `${size}px`;
trail.style.height = `${size}px`;
const rotation = Math.random() * 360; // Random rotation angle
trail.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
trail.style.transition = "opacity 0.5s ease, transform 0.5s ease";

trail.style.backgroundColor = "rgba(214, 127, 0, 0.8)"; // Dark Amber with opacity 0.8

// Add this to your CSS:


      trail.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      trailContainer.appendChild(trail);
      let trailCount = 0;
      const maxTrail = 50; // Limit to 50 elements
      
      
      setTimeout(() => {
        trail.style.opacity = "0";
        trail.style.transform = `translate(${x}px, ${y - 20}px)`;
        setTimeout(() => trail.remove(), 300);
      }, 0);
    };

    const handleMouseMove = (e: MouseEvent) => {
      createTrail(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      trailContainer.remove();
    };
  }, []);

  return null;
};

export default PixelTrail;
