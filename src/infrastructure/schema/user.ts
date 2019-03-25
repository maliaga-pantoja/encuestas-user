import Joi from 'joi'
const userSchema = Joi.object().keys({
  fullname: Joi.string().required(),
  documentNumber: Joi.string().min(8).max(20).required(),
  birthday: Joi.date().timestamp('unix').required(),
  phoneNumber: Joi.string().min(7).max(20).required(),
  dataVerified: Joi.boolean().required(),
})
export {userSchema}