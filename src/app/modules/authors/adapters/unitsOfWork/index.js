/* eslint-disable no-empty-function */
import { authorRepository } from '../repositories';
import makeDeleteAuthorWithBooks from './deleteAuthorWithBooks';

// book repository stub.
const booksRepository = { removeByAuthorId: () => 1 };

const deleteAuthorWithBooks = makeDeleteAuthorWithBooks({
  db: () => { }, // db context;
  authorRepository,
  booksRepository,
});

export { deleteAuthorWithBooks };
