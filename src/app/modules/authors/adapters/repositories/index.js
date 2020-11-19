
import makeAuthorRepository from './author';
import Author from '../../infrastructure/db/models/Author';

const authorRepository = makeAuthorRepository({ model: Author });

export { authorRepository };
