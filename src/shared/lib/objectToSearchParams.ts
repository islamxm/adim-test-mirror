export function objectToSearchParams(obj: object = {}) {
  const readyToParse = Object.entries(obj).filter(
    ([, value]) => typeof value === "string" || typeof value === "number",
  );
  return "?" + new URLSearchParams(readyToParse).toString();
}
