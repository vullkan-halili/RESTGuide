import makeAuthorDeserializer from './author';
import { expect } from 'chai';
import { makeAuthor } from '../../../entities';

describe('author json serializer', () => {
  const deserializeAuthor = makeAuthorDeserializer();

  it('should serialize author from author entity to json object', () => {
    const fakeAuthorInfo = {
      firstName: 'Alex',
      lastName: 'Smith',
      genres: ['Software Engineering'],
    };
    const fakeAuthor = makeAuthor(fakeAuthorInfo);

    const deserializedAuthor = deserializeAuthor(fakeAuthor);

    expect(deserializedAuthor).to.deep.equal(fakeAuthorInfo);
  });
});
