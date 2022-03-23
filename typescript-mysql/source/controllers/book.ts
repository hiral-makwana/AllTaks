import { Request, Response } from 'express';

import { Connect, Query } from '../config/mysql';



const createBook = async (req: Request, res: Response) => {
   let { author, title } = req.body;

    let query = `INSERT INTO books (author, title) VALUES ("${author}", "${title}")`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                 return res.status(200).json({
                        result
                    });
                })
            })
        .catch((error) => {
            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

const getAllBooks = async (req: Request, res: Response) => {
    let query = 'SELECT * FROM books';

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                return res.status(200).json({
                        results
                    });
                })
        })
        .catch((error) => {
            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

export default { createBook, getAllBooks };
