import Joi from 'joi'
const userCreate = Joi.object().keys({
  fullname: Joi.string().required(),
  documentNumber: Joi.string().min(8).max(20).required(),
  birthday: Joi.date().required(),
  phoneNumber: Joi.string().min(7).max(20).required(),
  dataVerified: Joi.boolean().required(),
})
export {userCreate}

const userFindById = Joi.object().keys({
  id: Joi.string().required()
})
export {userFindById}