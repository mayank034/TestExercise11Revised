import Joi from 'joi';
import constant from '../../config/constant';

export namespace UsersValidator {

  export const register = Joi.object({

    name: Joi.string().required().messages({
      'any.required': constant.GIVEN_NAME_REQUIRED,
      'string.empty': constant.GIVEN_NAME_REQUIRED,
      'string.base': constant.GIVEN_NAME_INVALID,
    }),
    email: Joi.string().required().email().messages({
      'any.required': constant.EMAIL_REQUIRED,
      'string.empty': constant.EMAIL_REQUIRED,
      'string.base': constant.TYPE_EMAIL,
      'string.email': constant.EMAIL_INVALID,
    }),
    password: Joi.string().required().min(8).messages({
      'any.required': constant.PASSWORD_REQUIRED,
      'string.empty': constant.PASSWORD_REQUIRED,
      'string.min': constant.PASSWORD_INVALID,
    }),
    accountTypeAdmin: Joi.number().integer().required().messages({
      'any.required': constant.ACCOUNTTYPE_REQUIRED,
    }),
  });

  export const login = Joi.object({
    email: Joi.string().email().required().messages({
      'any.required': constant.EMAIL_REQUIRED,
      'string.empty': constant.EMAIL_REQUIRED,
      'string.email': constant.EMAIL_INVALID,
    }),
    password: Joi.string().required().min(8).messages({
      'any.required': constant.PASSWORD_REQUIRED,
      'string.empty': constant.PASSWORD_REQUIRED,
      'string.base': constant.TYPE_PASSWORD,
      'string.min': constant.EMAIL_PASSWORD_MISMATCH,
    }),
  });
}
