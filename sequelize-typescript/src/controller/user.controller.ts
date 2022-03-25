import express, {Request, Response} from 'express';
import db from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const create = async(req:Request, res:Response) => {
    try{
        const bodydata = req.body;
        console.log(req.body)
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
 const wlcm = async ( req:Request, res:Response) => {
    res.send({msg:"welcome..authentication succesfull.."})
};
const findall = async (req:Request, res:Response) => {
    try{
       const data = await db.User.findAll({})
      return res.send(data)

    }catch (e){
        return res.send({msg:"data not found..", e})
    }
};
const updateuser = async (req:Request, res:Response) => {
    try{
        const data = await db.User.update(req.body, {where: {id:req.params.id } })
        console.log(data)
        return res.send({ data, msg:"successfully updated..."})
    }catch (e){
        res.send({msg:"fail to update",e})
    }
};
const deleteuser = async (req:Request, res:Response) => {
    try{
        const data = await db.User.destroy({where: {id:req.params.id } })
        return res.json({ data, msg:"successfully deleted..."})
    }catch (e){
        res.json({msg:"fail to delete",e})
    }
} ;


export default {create, login, wlcm, findall, updateuser, deleteuser }