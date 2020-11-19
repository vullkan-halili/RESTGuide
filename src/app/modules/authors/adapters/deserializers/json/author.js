import { makeAuthor } from '../../../entities';

export default function makeAuthorDeserializer() {
  return function deserializeAuthor(authorInfo) {
    return makeAuthor(authorInfo);
  };
}
