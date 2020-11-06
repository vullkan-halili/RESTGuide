import { BadRequest } from '../../../utils/error';

/**
 * Author entity constructor function builder.
 * @returns {Function} Author constructor function.
 */
export default function buildMakeAuthor() {
  return function makeAuthor({
    firstName,
    lastName,
    genres = [],
  }) {
    validateInputs({ firstName, lastName, genres });

    return Object.freeze({
      getFirstName: () => firstName,
      getLastName: () => lastName,
      getGenres: () => genres,
    });
  };

  function validateInputs({ firstName, lastName, genres }) {
    if (!firstName) { throw new BadRequest('Author must have a first name.'); }
    if (!lastName) { throw new BadRequest('Author must have a last name.'); }
    if (!genres) { throw new BadRequest('Author must have genres.'); }
  }
}