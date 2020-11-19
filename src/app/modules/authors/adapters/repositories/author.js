import makeBaseRepository from "../../../common/adapters/repositories/baseRepository";
import serializeAuthor from '../serializers/json';
import deserializeAuthor from '../deserializers/json';

export default function makeAuthorRepository({ model }) {
  const baseRepository = makeBaseRepository({
    model,
    serialize: serializeAuthor,
    deserialize: deserializeAuthor
  });

  return Object.freeze({
    findById,
    insert: baseRepository.insert,
    findOne: baseRepository.findOne,
    clear: baseRepository.clear,
  });

  async function findById(id) {
    const foundAuthor = await model.findById(id);
    if (foundAuthor) {
      return deserializeAuthor(foundAuthor);
    }

    return null;
  }
}