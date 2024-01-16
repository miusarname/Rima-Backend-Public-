import { Response, Request } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { UserP, User } from "../../Model/User.js";

export var data: object;

export async function validateUser(req: Request, res: Response, next: any) {
  try {
    data = plainToClass(User, req.body, {
      excludeExtraneousValues: true,
    });
    await validate(data);
    req.body = data; // Asignar los datos validados a req.body
    next();
    return data;
  } catch (error) {
    console.error("Error de validación:", error);
    res.status(500).send(JSON.stringify(error));
    return error;
  }
}

export async function validateUserput(req: Request, res: Response, next: any) {
  try {
    data = plainToClass(UserP, req.body, {
      excludeExtraneousValues: false,
    });
    await validate(data);
    req.body = data; // Asignar los datos validados a req.body
    next();
    return data;
  } catch (error) {
    console.error("Error de validación:", error);
    res.status(500).send(JSON.stringify(error));
    return error;
  }
}
