import { BadRequest, NotFound } from '../../../utils/error';
import chaiAsPromised from 'chai-as-promised';
import chai, { expect } from 'chai';
import makeAuthorRepository from '../adapters/repositories/author';
import Author from '../infrastructure/memoryDb/models/Author';
import makeGetAuthor from './getAuthor';

chai.use(chaiAsPromised);

describe('author serivce ==> get author', () => {
  const authorRepository = makeAuthorRepository({ model: Author });
  const getAuthor = makeGetAuthor({ authorRepository });


  afterEach(() => {
    // cleanup collections after each test.
    authorRepository.clear();
  });

  it('should throw error when no id is provided', async () => {
    await expect(getAuthor()).to.be.rejectedWith(BadRequest);
  });

  it('should throw error when user does not exists', async () => {
    await expect(getAuthor(2)).to.be.rejectedWith(NotFound);
  });

  it('should return requested user.', async () => {
    // BUILD.
    const fakeAuthor = { firstName: 'Alex', lastName: 'Smith', genres: ['Software Engineering'] };
    const authorModel = new Author(fakeAuthor);
    await authorModel.save();

    // OPERATE.
    const foundAuthor = await getAuthor(authorModel.id);

    // CHECK.
    expect(foundAuthor.getFirstName()).to.equal(fakeAuthor.firstName);
    expect(foundAuthor.getLastName()).to.equal(fakeAuthor.lastName);
  });

  after(() => {
    authorRepository.clear();
    // cleanup collections after all test are done (optional).
    // disconnect database.
  });
});