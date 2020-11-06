import { BadRequest } from "../../../utils/error";

/**
 * Genres entity constructor function builder.
 * @returns {Function} Genre constructor function 
 */
export default function buildMakeGenre() {
  return function makeGenre({ name, description }) {
    validateInputs({ name, description });

    return Object.freeze({
      getName: () => name,
      getDescription: () => description,
    });
  };

  function validateInputs({ name, description }) {
    if (!name) {
      throw new BadRequest('Genre must have a name.');
    }
    if (!description) {
      throw new BadRequest('Genre must have a description.');
    }
  }
}