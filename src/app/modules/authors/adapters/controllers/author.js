import { createAuthor, getAuthor } from "../../useCases";

export default function makeAuthorController({ serialize }) {
  return Object.freeze({
    create,
    readOne,
  });

  async function create(httpRequest) {
    const authorInfo = httpRequest.body;
    const createdAuthor = await createAuthor(authorInfo);

    return {
      body: serialize(createdAuthor),
      statusCode: 201,
    };
  }

  async function readOne(httpRequest) {
    const authorId = httpRequest.params.id;
    const foundAuthor = await getAuthor(authorId);

    return {
      body: serialize(foundAuthor),
      statusCode: 201,
    };
  }
}