import makeAuthorDeserializer from './author';
import { expect } from 'chai';

describe('author json deserializer', () => {
  const deserializeAuthor = makeAuthorDeserializer();

  it('should deserialize author from json object to author entity', () => {
    const fakeAuthor = {
      firstName: 'Alex',
      lastName: 'Smith',
      genres: ['Software Engineering'],
    };

    const deserializedAuthor = deserializeAuthor(fakeAuthor);

    expect(deserializedAuthor).to.have.property('getFirstName');
    expect(deserializedAuthor).to.have.property('getLastName');
    expect(deserializedAuthor).to.have.property('getGenres');
  });
});
