import { inputHeader,inputDescription } from "./input";
function preInput(header, description) {
  return (
    <>
      {inputHeader(header)}
      {inputDescription(description)}
    </>
  );
}
export default preInput;