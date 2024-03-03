# React Component Tree Visualizer

React Component Tree Visualizer provides a React component to visualize component trees in your Next.js applications.

## Installation

To install React Component Tree Visualizer, you can use npm:

```bash
npm install @omer-x/react-component-tree-visualizer
```

## How to Use in Your Next.js App

```typescript
import Visualizer from "@omer-x/react-component-tree-visualizer";
import React from "react";

type ComponentExplorerProps = {
  searchParams: {
    route?: string,
  },
};

const ComponentExplorer = ({
  searchParams,
}: ComponentExplorerProps) => {
  return (
    <Visualizer
      route={searchParams.route}
    />
  );
};

export default ComponentExplorer;
```

## Issues

If you encounter any issues or have suggestions for improvement, please submit them [here](https://github.com/omermecitoglu/react-component-tree-visualizer/issues).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
