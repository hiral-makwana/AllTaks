import express from 'express';
import controller from '../controller/user.controller';
const router = express.Router();
import verifyToken  from '../helpers/verifytoken';

router.post('/create',controller.create);
router.post('/login', controller.login);
router.get('/wlcm', verifyToken, controller.wlcm);
router.get('/findall', controller.findall);
router.put('/update/:id', controller.updateuser);
router.delete('/delete/:id', controller.deleteuser);

export default router;