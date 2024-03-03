"use client";
import React, { useEffect, useRef, useState } from "react";
import TreeBranch from "./TreeBranch";
import type { Component } from "@omer-x/react-component-tree-parser";

type FamilyMemberProps = {
  component: Component,
  generation: number,
  predecessors: number,
  containerWidth: number,
  selectedComponent: Component | null,
  onSelect: (component: Component) => void,
};

const FamilyMember = ({
  component,
  generation,
  predecessors,
  containerWidth,
  selectedComponent,
  onSelect,
}: FamilyMemberProps) => {
  const text = useRef<SVGTextElement>(null);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (!text.current) return;
    const bbox = text.current.getBBox();
    setTextWidth(bbox.width);
  }, [text]);

  const drawConnection = (lineStartX: number, curveStartX: number) => [
    `M ${lineStartX + 4},-1`,
    `L ${curveStartX},-1`,
    `Q ${curveStartX + 30},-1 ${curveStartX + 30},24`,
  ].join(" ");

  const cursorStyle = { cursor: component.ownChildren.length ? "pointer" : undefined };
  const textStyle = { ...cursorStyle };

  return (
    <g transform={`translate(0, ${predecessors * 24})`}>
      <g transform="translate(-10, -1)">
        <circle cx="0" cy="0" r="4" fill="black" />
        <path
          d={`M 0,0 Q -30,0 -30,-24 L -30,${-24 * (predecessors + 1)}`}
          fill="none"
          stroke="black"
        />
      </g>
      <text
        ref={text}
        x="0"
        y="0"
        textAnchor="start"
        alignmentBaseline="middle"
        fill={component.isClient ? "red" : "blue"}
        textDecoration={component.ownChildren.length ? "underline" : undefined}
        onClick={() => onSelect(component)}
        style={textStyle}
      >
        {`<${component.name} />`}
      </text>
      {selectedComponent === component && (
        <path
          d={drawConnection(textWidth, (containerWidth + 38) - (generation * 30) - 38)}
          fill="none"
          stroke="black"
        />
      )}
      <TreeBranch
        collection={component.children}
        depth={generation + 1}
        containerWidth={containerWidth}
        selectedComponent={selectedComponent}
      />
    </g>
  );
};

export default FamilyMember;
