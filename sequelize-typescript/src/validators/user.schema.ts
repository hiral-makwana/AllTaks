
import { celebrate, Joi, Segments } from 'celebrate';

export default {
  register: () => celebrate({
    [Segments.BODY]: Joi.object().keys({
    id: Joi.number().integer().required(),
    name:Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
    }),
  }),
//   login: () => celebrate({
//     [Segments.BODY]: Joi.object().keys({
//       email: Joi.string().email().required(),
//       password: Joi.string().required(),
//     }),
//   })
}
