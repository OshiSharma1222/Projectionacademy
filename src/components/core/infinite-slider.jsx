"use client";
import React, { useEffect, useRef } from "react";

export function InfiniteSlider({ children, direction = "horizontal", reverse = false }) {
  const scrollerRef = useRef(null);
  const scrollerInnerRef = useRef(null);

  useEffect(() => {
    if (!scrollerRef.current || !scrollerInnerRef.current) return;

    const scrollerContent = Array.from(scrollerInnerRef.current.children);

    const addAnimation = () => {
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerInnerRef.current.appendChild(duplicatedItem);
      });
    };

    addAnimation();

    return () => {
      // Cleanup duplicated items
      const items = Array.from(scrollerInnerRef.current.children);
      items.slice(scrollerContent.length).forEach((item) => item.remove());
    };
  }, [children]);

  const isVertical = direction === "vertical";

  return (
    <div
      ref={scrollerRef}
      className={`scroller relative ${
        isVertical ? "h-full" : "w-full"
      } overflow-hidden`}
    >
      <div
        ref={scrollerInnerRef}
        className={`flex ${
          isVertical ? "flex-col" : "flex-row"
        } ${
          reverse ? "animate-scroll-reverse" : "animate-scroll"
        } ${
          isVertical ? "animate-scroll-vertical" : "animate-scroll-horizontal"
        }`}
        style={{
          "--animation-duration": "20s",
          "--animation-direction": reverse ? "reverse" : "normal",
        }}
      >
        {children}
      </div>
    </div>
  );
}

