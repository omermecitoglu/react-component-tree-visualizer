import path from "node:path";
import Link from "next/link";
import React, { type ReactNode } from "react";
import { directoryExists, findRootPath, readDirectory } from "~/core/utils";

type AppRouteProps = {
  parentDirectory: string,
  name: string,
};

const AppRoute = async ({
  parentDirectory,
  name,
}: AppRouteProps): Promise<ReactNode> => {
  const rootDir = await findRootPath();
  const routePath = path.resolve(parentDirectory, name);
  const items = await readDirectory(routePath);
  const directories = items.filter(i => i.isDirectory);
  const pagePath = path.resolve(routePath, "page.tsx");
  const hasPage = await directoryExists(pagePath);
  const relativePath = pagePath.replace(rootDir, "");
  const route = encodeURIComponent(relativePath);

  return (
    <>
      {hasPage ? (
        <Link href={`?route=${route}`}>{name}</Link>
      ) : (
        name
      )}
      <ul>
        {directories.map(dir => (
          <li key={dir.path}>
            {/* @ts-expect-error Async Server Component */}
            <AppRoute
              parentDirectory={routePath}
              name={dir.name}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default AppRoute;
