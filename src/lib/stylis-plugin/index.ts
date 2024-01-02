import { transform } from "./transform";
import { expandShorthand } from "./expandShorthand";

// https://github.com/thysultan/stylis.js/tree/v3.5.4#plugins
const STYLIS_CONTEXTS = {
  POST_PROCESS: -2,
  PREPARATION: -1,
  NEWLINE: 0,
  PROPERTY: 1,
  SELECTOR_BLOCK: 2,
  AT_RULE: 3,
};

export function stylisPhysicalToLogical(context: number, content: string, selectors: string[]) {
  //debugger;

  console.log({ context, content, selectors: selectors.join("|") });
  return;
  // transform physical to logical
  if (context === STYLIS_CONTEXTS.PROPERTY) {
    // parse content
    const [, property, value] = content.match(/^([^:]+):(.+)$/) ?? [];

    // bail if property/value couldn't be found
    if (!property || !value) {
      return undefined;
    }

    // don't apply transform if property in [dir] block
    if (selectors.some((selector) => /\[dir(=[^\]]*)?\]/.test(selector))) {
      return undefined;
    }

    // expand shorthands and apply transforms
    return expandShorthand(property, value)
      .map((rule) => transform(...rule).join(":"))
      .join(";");
  }

  return undefined;
}

// stable identifier that will not be dropped by minification unless the whole module is unused
/* #__PURE__*/
Object.defineProperty(stylisPhysicalToLogical, "name", {
  value: "stylisPhysicalToLogical",
});
