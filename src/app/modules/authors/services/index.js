import makeCreateAuthor from './createAuthor';
import Author from '../../../models/author';

const createAuthor = makeCreateAuthor({ Author });

const authorServices = Object.freeze({ createAuthor });

export default authorServices;
export { createAuthor };
