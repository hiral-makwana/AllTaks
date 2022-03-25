import express from 'express';
import controller from '../controller/user.controller';
const router = express.Router();
import verifyToken  from '../helpers/verifytoken';
import { celebrate, Joi } from 'celebrate';
/* routes */
/* User Registrasion */
router.post('/register',
celebrate({body :Joi.object().keys({
    id: Joi.number().integer().required(),
    name:Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
    })
}) ,controller.register);
/* User Login */
router.post('/login', celebrate({body :Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
    })
}) , controller.login);
/* welcome page */
router.get('/wlcm', verifyToken, controller.wlcm);
/* get All User */
router.get('/findAllUser', controller.findall);
/* get User by Id */
router.get('/getUserById/:id', verifyToken,controller.getById);
/* Update user By Id */
router.put('/updateUser/:id', verifyToken, controller.updateuser);
/* delete Uesr By Id */
router.delete('/deleteUser/:id', verifyToken, controller.deleteuser);


export default router;