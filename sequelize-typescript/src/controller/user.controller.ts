import {Request, Response} from 'express';
import db from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import verifytoken from '../helpers/verifytoken'
dotenv.config();

/* User registration */
const register = async(req:Request, res:Response) => {
    try{
        const bodydata = req.body;
        const salt = bcrypt.genSaltSync(5);
        const hash = bcrypt.hashSync(bodydata.password,salt)
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
};
/* user Login */
const login = async (req:Request, res:Response) => {
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
};
/* welcome page */
 const wlcm = async ( req:Request, res:Response) => {
    res.send({msg:"welcome..authentication succesfull.."})
};
/* get all users */
const findall = async (req:Request, res:Response) => {
    try{
       const data = await db.User.findAll({})
      return res.send(data)

    }catch (e){
        return res.send({msg:"data not found..", e})
    }
};
/* get User By id */
const getById =  async (req:Request, res:Response) => {
    try{
        if(req.params.id == undefined)
        {
           return res.send({message:"User Not Found.."})
        }else{
            
            const data = await db.User.findOne({ where:{ id:req.params.id } })
            if (data.id === req.params.id){
                return res.send({data:data})
            }
            
            
        }
    }
    catch(e){
        return res.send(e)
    }
};
/* update User By Id */
const updateuser = async (req:Request, res:Response) => {
    try{
        const data = await db.User.update(req.body, {where: {id:req.params.id } })
        console.log(data)
        return res.send({ data, msg:"successfully updated..."})
    }catch (e){
        res.send({msg:"fail to update",e})
    }
};
/* delete User By Id */
const deleteuser = async (req:Request, res:Response) => {
    try{
        const data = await db.User.destroy({where: {id:req.params.id } })
        return res.json({ data, msg:"successfully deleted..."})
    }catch (e){
        res.json({msg:"fail to delete",e})
    }
} ;


export default {register, login, wlcm, findall, updateuser, deleteuser, getById }