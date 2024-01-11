import { StyleSheetManager } from "styled-components";
import { ComponentProps } from "react";

import { transform } from "./transform";
import { expandShorthand } from "./expandShorthand";

type StyleSheetManagerProps = ComponentProps<typeof StyleSheetManager>;
type StylisPlugins = StyleSheetManagerProps["stylisPlugins"];

type ArrayOf<T extends any[]> = T extends Array<infer U> ? U : never;
type StylisPlugin = ArrayOf<Exclude<StylisPlugins, undefined>>;

type Element = Parameters<StylisPlugin>[0];

const styleRuleIsInDirSelector = (element: Element): boolean => {
  let elToCheck: Element | null = element.parent;

  do {
    if (!elToCheck || /\[dir(=[^\]]*)?\]/.test(elToCheck.value)) {
      return true;
    }
  } while ((elToCheck = elToCheck.parent));

  return false;
};

export const stylisPhysicalToLogical: StylisPlugin = (element: Element) => {
  if (element.type === "decl") {
    if (styleRuleIsInDirSelector(element)) {
      return;
    }

    const property = typeof element.props === "string" ? element.props : element.props[0];
    const value = element.children as string;

    if (/-(left|right)/.test(property)) {
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.error(
          `Avoid using the ${property} property since it does not translate well to RTL languages. Instead, use equivalent -inline-start|end property ---> ${property}: ${value}`
        );
      }
    }

    const ret = `${expandShorthand(property, value)
      // @ts-ignore
      .map((rule) => transform(...rule).join(":"))
      .join(";")};`;

    element.return = ret;
  }
};
