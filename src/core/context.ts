import React from "react";
import type { Component } from "@omer-x/react-component-tree-parser";

type BranchContextValue = {
  selectComponent: (component: Component) => void,
};

const BranchContext = React.createContext<BranchContextValue>({
  selectComponent: () => null,
});

export default BranchContext;
