import { returnResult, validationError  , } from "./helpers.js";



// validators/taskValidator.js
 const DTOValidator = (schema) => (payload) => {
  return schema
    .validate(payload) // Validate the payload against the schema
    .then((res) => {
      return returnResult(true, res); // Return a successful result if validation passes
    })
    .catch((error) => {
      return validationError(error); // Return an error if validation fails
    });
};

export default DTOValidator ;
