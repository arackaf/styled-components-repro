const shorthandProperties = ['margin', 'padding'];

export function expandShorthand(
  property: string,
  value: string,
): [string, string][] {
  if (!shorthandProperties.includes(property)) {
    return [[property, value]];
  }

  const [top, right = top, bottom = top, left = right] = value
    .trim()
    .split(/\s+/);

  return [
    [`${property}-top`, top],
    [`${property}-right`, right],
    [`${property}-bottom`, bottom],
    [`${property}-left`, left],
  ];
}
