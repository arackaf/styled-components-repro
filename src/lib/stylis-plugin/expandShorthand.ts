export function expandShorthand(property: string, value: string): [string, string][] {
  const shorthandProperties = ["margin", "padding"];

  if (!shorthandProperties.includes(property)) {
    return [[property, value]];
  }
  // eslint-disable-next-line no-param-reassign
  value = value.replace(/var\(.+?\)/g, (match) => match.replace(/\s+/g, ""));

  const [top, right = top, bottom = top, left = right] = value.trim().split(/\s+/);

  if (left !== right) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error(
        `Avoid using the ${property} shorthand with different left/right values since this won't translate correctly to RTL languages. Instead, use ${property}-inline-start|end ---> ${property}: ${value}`
      );
    }
  }

  return [
    [`${property}-top`, top],
    [`${property}-right`, right],
    [`${property}-bottom`, bottom],
    [`${property}-left`, left],
  ];
}
