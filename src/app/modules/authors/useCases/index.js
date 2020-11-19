import makeCreateAuthor from './createAuthor';
import { authorRepository } from '../adapters/repositories';
import makeGetAuthor from './getAuthor';

const createAuthor = makeCreateAuthor({ authorRepository });
const getAuthor = makeGetAuthor({ authorRepository });

export { createAuthor, getAuthor };
