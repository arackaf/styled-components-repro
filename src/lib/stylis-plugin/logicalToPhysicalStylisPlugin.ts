import { StyleSheetManager } from "styled-components";
import { ComponentProps } from "react";

import { transform } from "./transform";

type StyleSheetManagerProps = ComponentProps<typeof StyleSheetManager>;
type StylisPlugins = StyleSheetManagerProps["stylisPlugins"];

type ArrayOf<T extends any[]> = T extends Array<infer U> ? U : never;
type StylisPlugin = ArrayOf<Exclude<StylisPlugins, undefined>>;

type Element = Parameters<StylisPlugin>[0];

const styleRuleIsInDirSelector = (element: Element): boolean => {
  let elToCheck: Element | null = element.parent;

  do {
    if (!elToCheck || /\[dir(=[^\]]*)?\]/.test(elToCheck.value)) {
      console.log("HIT", element);
      return true;
    }
  } while ((elToCheck = elToCheck.parent));

  return false;
};

export function expandShorthand(property: string, value: string): [string, string][] {
  const shorthandProperties = ["margin", "padding"];

  if (!shorthandProperties.includes(property)) {
    return [[property, value]];
  }

  const [top, right = top, bottom = top, left = right] = value.trim().split(/\s+/);

  return [
    [`${property}-top`, top],
    [`${property}-right`, right],
    [`${property}-bottom`, bottom],
    [`${property}-left`, left],
  ];
}

export const stylisPhysicalToLogical: StylisPlugin = (element: Element, content, selectors) => {
  if (element.type === "decl") {
    console.log(element);
    if (styleRuleIsInDirSelector(element)) {
      return;
    }

    const property = typeof element.props === "string" ? element.props : element.props[0];
    const value = element.children as string;

    const ret =
      expandShorthand(property, value)
        .map((rule) => transform(...rule).join(":"))
        .join(";") + ";";

    element.return = ret;
  }
};
