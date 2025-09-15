"use client";
import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

export const GlowingStarsBackgroundCard = ({
  className,
  children,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden group",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced star pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:12px_20px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_110%)]" />
      
      {/* Additional star pattern for more visibility */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#ffffff12_1px,transparent_1px),linear-gradient(-45deg,#ffffff12_1px,transparent_1px)] bg-[size:18px_18px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_50%,transparent_100%)]" />
      
      {/* Interactive glow effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-blue-50/20 to-transparent transition-all duration-500"
        style={{
          background: isHovered 
            ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`
            : 'linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 0%, transparent 100%)'
        }}
      />
      
      {/* Animated stars with enhanced visibility */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full transition-all duration-500 group-hover:scale-150 group-hover:opacity-100"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: Math.random() * 0.9 + 0.3,
              boxShadow: isHovered ? '0 0 10px rgba(255, 255, 255, 0.8)' : '0 0 2px rgba(255, 255, 255, 0.5)',
            }}
          />
        ))}
      </div>
      
      {/* Interactive cursor glow */}
      {isHovered && (
        <div
          className="absolute w-32 h-32 bg-blue-400/20 rounded-full blur-xl transition-all duration-300 pointer-events-none"
          style={{
            left: mousePosition.x - 64,
            top: mousePosition.y - 64,
          }}
        />
      )}
      
      {children}
    </div>
  );
};

export const GlowingStarsDescription = ({
  className,
  children,
}) => {
  return (
    <p
      className={cn(
        "text-base text-white/90 max-w-[25rem]",
        className,
      )}
    >
      {children}
    </p>
  );
};

export const GlowingStarsTitle = ({
  className,
  children,
}) => {
  return (
    <h2
      className={cn(
        "text-xl font-bold text-white",
        className,
      )}
    >
      {children}
    </h2>
  );
};
