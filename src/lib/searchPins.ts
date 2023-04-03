import retrievePins from "../helpers/retrievePins.js";
export default async function searchPins(query: string) {
  if (!query) throw new Error("No query specified");
  if (typeof query !== "string")
    throw new Error("You can only pass a string as query.");
  const response = await retrievePins(query);
  return response;
}
