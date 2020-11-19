export default function makeAuthorSerializer() {
  return function serializeAuthor(author) {
    return {
      firstName: author.getFirstName(),
      lastName: author.getLastName(),
      genres: author.getGenres(),
    };
  };
}
