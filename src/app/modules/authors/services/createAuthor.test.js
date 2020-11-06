import makeCreateAuthor from './createAuthor';
import Author from './Author';
import { UnprocessableEntity } from '../../../utils/error';
import chaiAsPromised from 'chai-as-promised';
import chai, { expect } from 'chai';

chai.use(chaiAsPromised);

describe('author serivce -> create author', () => {
    // setup 
    const createAuthor = makeCreateAuthor({ Author });
    before(async () => {
        // connect to in-memory database.
        // cleanup collections before testing.
    });

    afterEach(() => {
        // cleanup collections after each test.
        Author.clear();
    });

    it('should insert an author.', async () => {
        // insert author first.
        // will throw error when trying to insert second time.
        const author = { firstName: 'John', lastName: 'Doe', genres: ['Sci-Fi', 'Software Engineering'] };
        const createdAuthor = await createAuthor(author);
        expect(createdAuthor.firstName).equal(author.firstName);
    });

    it('must throw error when an author exists.', async () => {
        // insert author first.
        // will throw error when trying to insert second time.
        const author = { firstName: 'Alex', lastName: 'Smith', genres: ['Software Engineering'] };
        await createAuthor(author);
        await expect(createAuthor(author)).to.be.rejectedWith(UnprocessableEntity);
    });

    after(async () => {
        // cleanup collections after all test are done (optional).
        // disconnect database.
    });
});
