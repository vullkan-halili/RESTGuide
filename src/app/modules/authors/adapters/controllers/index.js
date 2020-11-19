import makeAuthorController from './author';
import serializeAuthor from '../serializers/json';

// We can inject different types of serializers here.
// for example we can add XML Serializer, Protocol Buffer Serializer etc.
const authorController = makeAuthorController({ serialize: serializeAuthor });

export default authorController;
