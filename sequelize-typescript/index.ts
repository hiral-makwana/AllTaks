import express, {Request, Response} from 'express';
const app = express();
const port = process.env.PORT || 3000;
import db from './models';
import { v4 as uuidv4 } from 'uuid';

app.use(express.json())
app.post('/create', async (req:Request, res:Response) => {
    const bodydata = req.body;
    console.log(bodydata)
    try{
        const data = await db.User.create(bodydata)
        return res.json({ data, msg:"successfully created..."})
    }catch (e){
        res.json({msg:"fail to ctreate",e})
    }
} )
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
app.get('/', (req, res) => {
    db.User.findAll({
        include: {
            model: db.Project
        }
    }).then((result: object) => res.json(result)).catch((err: object) => console.error(err));
})


db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
})