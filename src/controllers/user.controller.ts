import { User } from "../models/user.model";
import { Request, Response } from 'express';

export function findAll(req: Request, res: Response) {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while getting list of users."
            });
        });

}
