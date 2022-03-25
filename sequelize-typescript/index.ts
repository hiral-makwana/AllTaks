import express, {Request, Response, Express} from 'express';
import bodyParser from 'body-parser';
const app = express();
import db from './src/models';
import dotenv from 'dotenv';
dotenv.config();
import routes from './src/routes/user.routes';

const router: Express = express();

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

app.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

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