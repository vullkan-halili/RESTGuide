export default function makeBaseRepository({ model, serialize, deserialize }) {
  return Object.freeze({
    insert,
    findOne,
    findById,
    remove,
    clear,
  });

  async function insert(entity) {
    const serializedEntity = serialize(entity);
    const itemToSave = new model(serializedEntity);
    const inserted = await itemToSave.save();

    return deserialize(inserted);
  }

  async function findOne(query = {}) {
    const found = await model.findOne(query);
    if (found) {
      return deserialize(found);
    }

    return null;
  }

  async function findById(id) {
    const found = await model.findOne({ _id: id });

    return deserialize(found);
  }

  async function remove(id) {
    const deleted = await model.deleteOne(id);

    return deserialize(deleted);
  }


  async function clear() {
    await model.clear();

    return [];
  }
}