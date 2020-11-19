/* eslint-disable require-await */
import { InternalError } from "../../../../utils/error";

export default function makeDeleteAuthorWithBooks({ db, authorRepository, booksRepository }) {
  return async function deleteAuthorWithBooks(authorId) {
    return deleteAuthorWithBooksUnitOfWork(authorId);
  };

  async function deleteAuthorWithBooksUnitOfWork(authorId) {
    const session = await db.startSession();
    session.startTransaction();
    try {
      const opts = { session };
      const deletedAuthor = await authorRepository.remove(authorId, opts);
      if (deletedAuthor === 0) {
        // If Author is not deleted, fail and abort the transaction
        // `session.abortTransaction()` will undo the above `author deletion`
        throw new InternalError();
      }

      const deletedBooks = await booksRepository.removeByAuthorId(authorId, opts);

      await session.commitTransaction();
      session.endSession();

      return {
        deletedAuthor,
        deletedBooks,
      };
    } catch (error) {
      // If an error occurred, abort the whole transaction and
      // undo any changes that might have happened
      await session.abortTransaction();
      session.endSession();
      throw error; // Rethrow so calling function sees error
    }
  }
}