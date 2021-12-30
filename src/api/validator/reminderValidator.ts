import Joi from 'joi';
import constant from '../../config/constant';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ReminderValidator {
  export const createReminder = Joi.object({

    description: Joi.string().required().messages({
      'any.required': constant.GIVEN_NAME_REQUIRED,
      'string.empty': constant.GIVEN_NAME_REQUIRED,
      'string.base': constant.GIVEN_NAME_INVALID,
    }),
    // email: Joi.string().required().email().messages({
    //   'any.required': constant.EMAIL_REQUIRED,
    //   'string.empty': constant.EMAIL_REQUIRED,
    //   'string.base': constant.TYPE_EMAIL,
    //   'string.email': constant.EMAIL_INVALID,
    // }),
    // password: Joi.string().required().min(8).messages({
    //   'any.required': constant.PASSWORD_REQUIRED,
    //   'string.empty': constant.PASSWORD_REQUIRED,
    //   'string.min': constant.PASSWORD_INVALID,
    // }),
    // accountTypeAdmin: Joi.number().integer().required().messages({
    //   'any.required': constant.ACCOUNTTYPE_REQUIRED,
    // }),
  });
}
