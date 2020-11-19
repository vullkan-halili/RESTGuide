import { BadRequest, NotFound } from "../../../utils/error";

/**
 * Get author service.
 * @param {Object} authorRepository - Author Repository object.
 * @returns {Function} - Get author function
 */
export default function makeGetAuthor({ authorRepository }) {
  return async function getAuthor(id) {
    if (!id) {
      throw new BadRequest();
    }

    const foundAuthor = await authorRepository.findById(id);
    if (!foundAuthor) {
      throw new NotFound();
    }

    return foundAuthor;
  };
}
