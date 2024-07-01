export default function RemoveSpace(inputString: string): string {
  // Use a regular expression to replace all spaces with an empty string
  return inputString.replace(/\s/g, "");
}
