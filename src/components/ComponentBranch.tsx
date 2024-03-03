"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import TreeBranch from "~/components/TreeBranch";
import BranchContext from "~/core/context";
import { familySize, findFamilyOrder, findParentMembers, getBiggestFamily } from "~/core/family";
import type { Component } from "@omer-x/react-component-tree-parser";

type ComponentBranchProps = {
  x?: number,
  y?: number,
  collection: Component[],
};

const ComponentBranch = ({
  x = 0,
  y = 0,
  collection,
}: ComponentBranchProps) => {
  const container = useRef<SVGGElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);

  useEffect(() => {
    if (!container.current) return;
    const bbox = container.current.getBBox();
    setContainerWidth(bbox.width - 30);
  }, [container, collection]);

  useEffect(() => {
    const parents = findParentMembers(collection);
    setSelectedComponent(parents.length ? getBiggestFamily(parents) : null);
  }, [collection]);

  const order = useMemo(() => findFamilyOrder(collection, selectedComponent), [collection, selectedComponent]);

  return (
    <BranchContext.Provider value={{ selectComponent: setSelectedComponent }}>
      <g className="component-branch" transform={`translate(${x}, ${y})`}>
        <g transform="translate(-10, -1)">
          <circle cx="0" cy="0" r="4" fill="black" />
        </g>
        <rect
          x="20"
          y="10"
          width={containerWidth + 10}
          height={familySize(collection) * 24}
          rx="10"
          ry="10"
          fill="lightgrey"
        />
        <TreeBranch
          ref={container}
          collection={collection}
          depth={0}
          containerWidth={containerWidth}
          selectedComponent={selectedComponent}
        />
        {selectedComponent && (
          <ComponentBranch
            x={containerWidth + 70}
            y={(order + 2) * 24}
            collection={selectedComponent.ownChildren}
          />
        )}
      </g>
    </BranchContext.Provider>
  );
};

export default ComponentBranch;
