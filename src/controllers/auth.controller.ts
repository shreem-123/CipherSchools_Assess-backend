import { Request, Response } from 'express';

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../models/user");

export function signup(req: Request, res: Response) {
    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err: Error, user: any) => {
        if (err) {
            res.status(500)
                .send({
                    message: err
                });
            return;
        } else {
            res.status(200)
                .send({
                    message: "User Registered successfully"
                })
        }
    });
};

export function signin(req: Request, res: Response) {
    User.findOne({
        email: req.body.email
    })
        .exec((err: any, user: { password: any; id: any; _id: any; email: any; fullName: any; }) => {
            if (err) {
                res.status(500)
                    .send({
                        message: err
                    });
                return;
            }
            if (!user) {
                return res.status(404)
                    .send({
                        message: "User Not found."
                    });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401)
                    .send({
                        accessToken: null,
                        message: "Invalid Password!"
                    });
            }
            var token = jwt.sign({
                id: user.id
            }, process.env.API_SECRET, {
                expiresIn: 86400
            });

            res.status(200)
                .send({
                    user: {
                        id: user._id,
                        email: user.email,
                        fullName: user.fullName,
                    },
                    message: "Login successful",
                    accessToken: token,
                });
        });
};