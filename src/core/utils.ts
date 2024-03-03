import "server-only";
import fs from "node:fs/promises";
import path from "node:path";

type DirectoryChild = {
  name: string,
  path: string,
  isDirectory: boolean,
};

export async function directoryExists(dirPath: string) {
  try {
    await fs.access(dirPath);
    return true; // Directory exists
  } catch (error) {
    if (error instanceof Error && error.message.includes("ENOENT")) {
      return false; // Directory does not exist
    } else {
      throw error; // Other errors
    }
  }
}

export async function findRootPath() {
  const rootPath = process.cwd();
  const srcDir = path.resolve(rootPath, "src");
  if (await directoryExists(srcDir)) {
    return srcDir;
  }
  return rootPath;
}

export async function readDirectory(dirPath: string) {
  const collection: DirectoryChild[] = [];
  const list = await fs.readdir(dirPath);
  for (const itemName of list) {
    const itemPath = path.resolve(dirPath, itemName);
    const stats = await fs.stat(itemPath);
    collection.push({
      name: itemName,
      path: itemPath,
      isDirectory: stats.isDirectory(),
    });
  }
  return collection;
}
