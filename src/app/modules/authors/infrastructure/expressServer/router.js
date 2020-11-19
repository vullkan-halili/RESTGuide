import { Router } from 'express';
import Passport from 'passport';
import * as validator from './middlewares/validator';
import * as authorization from './middlewares/authorization';
import authorController from '../../adapters/controllers';
import makeExpressCallback from '../../adapters/webServer/expressCallback';

const router = new Router();
const BASE_ROUTE = `/authors`;

router.route(BASE_ROUTE).post(
  Passport.authenticate('jwt', { session: false }),
  authorization.updateAuthorAuthorization,
  validator.createAuthorValidator,
  makeExpressCallback(authorController.create),
);

router.route(`${BASE_ROUTE}/:id`).get(
  Passport.authenticate('jwt', { session: false }),
  makeExpressCallback(authorController.readOne),
);

export default router;
