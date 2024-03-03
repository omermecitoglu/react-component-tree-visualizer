import type { Component } from "@omer-x/react-component-tree-parser";

/**
 * Returns the number of components in a family tree of components
 */
export function familySize(family: Component[]): number {
  return family.reduce((acc, member) => acc + 1 + familySize(member.children), 0);
}

/**
 * Returns the number of components in a family tree of components but tracking their own children
 */
function ownFamilySize(family: Component[]): number {
  return family.reduce((acc, member) => acc + 1 + familySize(member.ownChildren), 0);
}

/**
 * Returns the component which has the biggest family in a family tree of components
 */
export function getBiggestFamily(family: Component[]) {
  return family.toSorted((a, b) => ownFamilySize([b]) - ownFamilySize([a]))[0];
}

/**
 * Returns a flat array of a family tree of components
 */
function flattenFamily(family: Component[]): Component[] {
  return family.map(member => [member, ...flattenFamily(member.children)]).flat();
}

/**
 * Returns the index of the target component in a family tree of components
 */
export function findFamilyOrder(family: Component[], target: Component | null) {
  if (!target) return -1;
  const flatFamily = flattenFamily(family);
  return flatFamily.indexOf(target);
}

/**
 * Returns parent components in a family tree of components
 */
export function findParentMembers(family: Component[]) {
  const flatFamily = flattenFamily(family);
  return flatFamily.filter(member => member.ownChildren.length);
}
