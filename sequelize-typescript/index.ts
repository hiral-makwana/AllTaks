import express, {Request, Response} from 'express';
const app = express();
import db from './models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import verify from './utils/verifytoken';
import { v4 as uuidv4 } from 'uuid';

app.use(express.json())
app.post('/create', async (req:Request, res:Response) => {
    try{
        const bodydata = req.body;
        const salt = bcrypt.genSaltSync(5);
        const hash = bcrypt.hashSync(req.body.password,salt)
        const data = await db.User.create({
            id:bodydata.id,
            name:bodydata.name,
            email:bodydata.email,
            password:hash
        })
        return res.json({ data, msg:"successfully created..."})
    }catch (e){
        res.json({msg:"fail to ctreate",e})
    }
} );

app.post('/login', async (req:Request, res:Response) => {
    try{
        const secret:any = process.env.TOKEN_SECRET;
        const bodydata = req.body;
        const userdata = await db.User.findOne({where: { email: bodydata.email} })
        if(userdata.email === null || userdata.email ===undefined){
            res.send("email not found..")
        }else if(!bcrypt.compareSync(bodydata.password.toString(), userdata.password.toString())){
            res.send("password invalid...")
        }else{
            const token = jwt.sign( { id:userdata.id }, secret, { expiresIn: '1h' })
            res.send({msg:"login successfully..",Token:token})
        }
    }catch(e){
        return res.send(e)
    }
})
app.get('/wlcm', verify ,async ( req:Request, res:Response) => {
    res.send({msg:"welcome..authentication succesfull.."})
})
app.get('/findall', async (req:Request, res:Response) => {
    try{
       const data = await db.User.findAll({})
      return res.send(data)

    }catch (e){
        return res.send({msg:"data not found..", e})
    }
    
});
app.put('/update/:id', async (req:Request, res:Response) => {
    try{
        const data = await db.User.update(req.body, {where: {id:req.params.id } })
        console.log(data)
        return res.send({ data, msg:"successfully updated..."})
    }catch (e){
        res.send({msg:"fail to update",e})
    }
} );

app.delete('/delete/:id', async (req:Request, res:Response) => {
    try{
        const data = await db.User.destroy({where: {id:req.params.id } })
        return res.json({ data, msg:"successfully deleted..."})
    }catch (e){
        res.json({msg:"fail to delete",e})
    }
} );

db.sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`App listening on port ${process.env.PORT}`)
    })
})
//without req.body
//const createUser = () => {
  //  console.log(users)
   // users.map(users => {
        // db.User.create({
        //     id: uuidv4(),
        //     name:'hiral',
        //     email:"hirak4@iosw.com",
        //     password:"1234"
        // })
 //   })
//}
//createUser();