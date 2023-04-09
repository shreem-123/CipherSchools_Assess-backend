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

export function findOne(req: Request, res: Response) {
    User.findById(req.params.id)
     .then(user => {
     if(!user) {
      return res.status(404).send({
      message: "User not found with id " + req.params.id
    });
   }
    res.send(user);
   }).catch(err => {
     if(err.kind === 'ObjectId') {
       return res.status(404).send({
       message: "User not found with id " + req.params.id
     });
   }
   return res.status(500).send({
     message: "Error getting user with id " + req.params.id
   });
   });
   };
   

export function create(req: Request, res: Response) {
    if (!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }

    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.last_name,
        phone: req.body.last_name,
        password: req.body.password
    });

    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while creating new user."
            });
        });
};
