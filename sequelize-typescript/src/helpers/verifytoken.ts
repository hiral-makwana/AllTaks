import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export default function verifyToken (req:Request, res:Response, next:NextFunction) {
  const token:any = req.headers['authentication'];
  if (!token) {
    res.json({ msg: 'Token provided not found' });
  }
  const secret:any = process.env.TOKEN_SECRET;
  jwt.verify(token, secret , (err:any, decoded:any) => {
    if (err) {
      if (err.toString() === 'TokenExpiredError: jwt expired') {
        res.send({
          message: 'Please LogIn First..'
        }); 
      }
      res.send({
        message: 'Failed to authentication..invalid token'
      });
    }
    delete decoded.iat;
    delete decoded.exp;
  //req.token_parse = decoded;
    return next();
  });
}

//module.exports =  verifyToken;
