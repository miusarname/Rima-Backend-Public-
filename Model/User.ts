import { Expose, Type, Transform } from "class-transformer";
import { IsDefined, IsNumber, IsString, IsDate,IsEmail, isDefined, isString } from "class-validator";

export interface UserT{
    nombre : string;
    correo_electronico : string;
    contrasenia : string;
}

export interface UserL{
  username:string;
  password:string;
}

export class User implements UserT{
    @Expose({name : "name"})
    @IsString()
    @IsDefined({
        message: () => {
          throw {
            status: 422,
            message: "El parametro es obligatorio -> name",
          };
        },
      })
    nombre: string;

    @Expose({name : "email"})
    @IsEmail()
    @IsDefined({
        message: () => {
          throw {
            status: 422,
            message: "El parametro es obligatorio -> email",
          };
        },
      })
    correo_electronico: string;

    @Expose({name : "password"})
    @IsString()
    @IsDefined({
        message: () => {
          throw {
            status: 422,
            message: "El parametro es obligatorio -> password",
          };
        },
      })
    contrasenia: string;

    @Expose({name:"image_profile_url"})
    @IsString()
    profile_image: string;

    constructor(name:string,email:string,password:string,image_profile_url:string) {
        this.nombre = name
        this.contrasenia = password
        this.correo_electronico = email
        this.profile_image = image_profile_url
    }
}

export class UserP implements UserT{
  @Expose({name : "name"})
  @IsString()
  nombre: string;

  @Expose({name : "email"})
  @IsEmail()
  correo_electronico: string;

  @Expose({name : "password"})
  @IsString()
  contrasenia: string;

  constructor(name:string,email:string,password:string,image_profile_url:string) {
      this.nombre = name
      this.contrasenia = password
      this.correo_electronico = email
  }
}