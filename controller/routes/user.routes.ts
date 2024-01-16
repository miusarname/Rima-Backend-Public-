import { Router } from "express";
import { deleteUser,getAllUser,getUser,postUser,putUser,Logging } from "../Users.controller.js";
import { validateUser,validateUserput } from "../storage/User.DTO.js";
import { GetAll,deleteLimiter,post,search } from "../helpers/limiter.controller.js";

export const user:Router = Router();

user.get('/',GetAll(),getAllUser);
user.get('/search/',search(),getUser);
user.post('/',post(),validateUser,postUser);
user.put('/',post(),validateUserput,putUser);
user.delete('/',deleteLimiter(),deleteUser);
user.get('/login',Logging);