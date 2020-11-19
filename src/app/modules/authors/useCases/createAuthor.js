import errors from "../../../constants/errors";
import { UnprocessableEntity } from "../../../utils/error";
import { makeAuthor } from "../entities";

/**
 * Create author service.
 * @param {Object} authorRepository - Author Repository object.
 * @returns {Function} - Create author function
 */
export default function makeCreateAuthor({ authorRepository }) {
  return async function createAuthor(authorInfo) {
    const author = makeAuthor(authorInfo);

    await validateExistingAuthor({
      firstName: author.getFirstName(),
      lastName: author.getLastName(),
    });

    return authorRepository.insert(author);
  };

  async function validateExistingAuthor({ firstName, lastName }) {
    const existingAuthor = await authorRepository.findOne({
      firstName,
      lastName,
    });
    if (existingAuthor) {
      throw new UnprocessableEntity(errors.AUTHOR_EXISTS);
    }
  }
}
