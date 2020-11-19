export default function makeExpressCallback(controller) {
  return async (req, res, next) => {
    const httpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      method: req.method,
      userId: req.userId, // We pass current user id which should be configured in authentication middleware using Passport in our case,
    };

    try {
      const httpResponse = await controller(httpRequest);
      if (httpResponse.headers) {
        res.set(httpResponse.headers);
      }

      res.type('json');

      return res
        .status(httpResponse.headers.statusCode)
        .send(JSON.stringify(httpResponse.body));
    } catch (ex) {
      // LOGGER - log errors.
      return next(ex);
    }
  };
}