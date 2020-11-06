/* eslint-disable valid-jsdoc */
/* eslint-disable require-await */
import errors from "../../../constants/errors";
import { UnprocessableEntity } from "../../../utils/error";
import { makeAuthor } from "../entities";

/**
 * Create author service.
 * @param {Object} Author - Author Model (better option would be a repository.).
 * @returns {Function} - Create author function
 */
export default function makeCreateAuthor({ Author }) {
  return async function createAuthor(authorInfo) {
    const author = makeAuthor(authorInfo);

    await validateExistingAuthor({
      firstName: author.getFirstName(),
      lastName: author.getLastName(),
    });

    return saveAuthor(author);
  };

  async function validateExistingAuthor({ firstName, lastName }) {
    const existingAuthor = await Author.findOne({
      firstName,
      lastName,
    });
    if (existingAuthor) {
      throw new UnprocessableEntity(errors.AUTHOR_EXISTS);
    }
  }

  async function saveAuthor(author) {
    const authorModel = new Author(
      author.getFirstName(),
      author.getLastName(),
      author.getGenres(),
    );

    return authorModel.save();
  }
}