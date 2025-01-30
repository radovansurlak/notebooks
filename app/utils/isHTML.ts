export function isHTML(string: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(string, "text/html");
  return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
}
