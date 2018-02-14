const { celebrate, Joi, errors } = require('celebrate');

class routeValidator {
  static fileReader() {
    return celebrate({
      body: Joi.object().keys({
        searchWord: Joi.string().required(),
      }),
    });
    // return validator;
  }
  static validationError() {
    // const validationError = errors();
    return errors();
  }
}

module.exports = routeValidator;
