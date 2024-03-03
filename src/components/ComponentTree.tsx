"use client";
import SvgViewport from "@omer-x/svg-viewport";
import React, { useEffect, useRef, useState } from "react";
import pattern from "~/core/paper-pattern";
import ComponentBranch from "./ComponentBranch";
import type { Component } from "@omer-x/react-component-tree-parser";

type ComponentTreeProps = {
  tree: Component[],
};

const ComponentTree = ({
  tree,
}: ComponentTreeProps) => {
  const container = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const currentContainer = container.current;
    if (!currentContainer) return;
    const updateSize = () => {
      setWidth(currentContainer.clientWidth);
      setHeight(currentContainer.clientHeight);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [container.current]);

  const containerStyle: React.CSSProperties = {
    ...pattern,
    flexGrow: 1,
    userSelect: "none",
  };

  return (
    <div ref={container} style={containerStyle}>
      {width > 0 && height > 0 && (
        <SvgViewport
          width={width}
          height={height}
          pannable
          initialFocusPoint="top-left"
        >
          <g transform="translate(16, 8)">
            <ComponentBranch collection={tree} />
          </g>
        </SvgViewport>
      )}
    </div>
  );
};

export default ComponentTree;
