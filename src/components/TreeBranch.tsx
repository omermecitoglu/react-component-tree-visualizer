"use client";
import React, { useContext } from "react";
import FamilyMember from "~/components/FamilyMember";
import BranchContext from "~/core/context";
import { familySize } from "~/core/family";
import type { Component } from "@omer-x/react-component-tree-parser";

type TreeBranchProps = {
  collection: Component[],
  depth: number,
  containerWidth: number,
  selectedComponent: Component | null,
};

const TreeBranch = React.forwardRef(function(props: TreeBranchProps, ref: React.ForwardedRef<SVGGElement>) {
  const { collection, depth, containerWidth, selectedComponent } = props;
  const { selectComponent } = useContext(BranchContext);

  const handleSelect = (component: Component) => {
    if (!component.ownChildren.length) return;
    selectComponent(component);
  };

  return (
    <g ref={ref} className="tree-branch" transform="translate(30, 24)">
      {collection.map((component, index) => (
        <FamilyMember
          key={`${component.name}_${index}`}
          generation={depth}
          component={component}
          predecessors={familySize(collection.slice(0, index))}
          containerWidth={containerWidth}
          selectedComponent={selectedComponent}
          onSelect={handleSelect}
        />
      ))}
    </g>
  );
});

export default TreeBranch;
