import Joi from 'joi';

import { BadRequest } from '../../../utils/error';

export default function isValidAuthor(author) {
  const schema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    genres: Joi.array().items(Joi.string()).min(1).required(),
  }).required();

  const result = schema.validate(author);

  if (result.error) {
    throw new BadRequest(result?.error?.details);
  }

  return true;
}
