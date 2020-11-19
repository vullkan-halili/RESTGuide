import makeCreateAuthor from './createAuthor';
import { UnprocessableEntity } from '../../../utils/error';
import chaiAsPromised from 'chai-as-promised';
import chai, { expect } from 'chai';
import makeAuthorRepository from '../adapters/repositories/author';
import Author from '../infrastructure/memoryDb/models/Author';

chai.use(chaiAsPromised);

describe('author serivce ==> create author', () => {
  // setup 
  const authorRepository = makeAuthorRepository({ model: Author });
  const createAuthor = makeCreateAuthor({ authorRepository });

  before(async () => {
    // connect to in-memory database.
    // cleanup collections before testing.
  });

  afterEach(() => {
    // cleanup collections after each test.
    authorRepository.clear();
  });

  it('must throw error when an author exists.', async () => {
    // insert author first.
    // will throw error when trying to insert second time.
    const author = { firstName: 'Alex', lastName: 'Smith', genres: ['Software Engineering'] };
    await createAuthor(author);
    await expect(createAuthor(author)).to.be.rejectedWith(UnprocessableEntity);
  });

  it('should insert an author.', async () => {
    // insert author first.
    const authorInfo = { firstName: 'John', lastName: 'Doe', genres: ['Sci-Fi', 'Software Engineering'] };
    const createdAuthor = await createAuthor(authorInfo);
    expect(createdAuthor.getFirstName()).equal(authorInfo.firstName);
  });

  after(() => {
    // cleanup collections after all test are done (optional).
    // disconnect database.
    authorRepository.clear();
  });
});
