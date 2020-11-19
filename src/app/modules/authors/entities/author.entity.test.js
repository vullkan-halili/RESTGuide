
import { expect } from 'chai';
import { BadRequest } from '../../../utils/error';
import buildMakeAuthor from './author.entity';

describe('author entity', () => {
  const makeAuthor = buildMakeAuthor();

  it('must have a first name', () => {
    const author = {
      lastName: 'Fisteku',
      genres: ['Sci-Fi'],
    };

    expect(() => makeAuthor(author)).to.throw(BadRequest);
  });

  it('must have a last name', () => {
    const author = {
      fistName: 'Filan',
      genres: ['Sci-Fi'],
    };

    expect(() => makeAuthor(author)).to.throw(BadRequest);
  });
});
