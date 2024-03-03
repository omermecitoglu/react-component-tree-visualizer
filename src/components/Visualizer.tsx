import path from "node:path";
import parseComponentTree from "@omer-x/react-component-tree-parser";
import React from "react";
import AppRoute from "~/components/AppRoute";
import ComponentTree from "~/components/ComponentTree";
import { findRootPath } from "~/core/utils";

type VisualizerProps = {
  route: string,
};

const Visualizer = async ({
  route,
}: VisualizerProps) => {
  const rootDir = await findRootPath();
  const routePath = path.join(rootDir, decodeURIComponent(route));
  const tree = routePath ? parseComponentTree(routePath, false) : null;

  const container: React.CSSProperties = {
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
  };

  const navigation: React.CSSProperties = {
    padding: "1rem 2rem",
    flexShrink: 0,
  };

  return (
    <div style={container}>
      <div style={navigation}>
        {/* @ts-expect-error Async Server Component */}
        <AppRoute
          parentDirectory={rootDir}
          name="app"
        />
      </div>
      {tree && (
        <ComponentTree tree={tree} />
      )}
    </div>
  );
};

export default Visualizer;
