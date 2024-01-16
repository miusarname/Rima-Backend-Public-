import cloudinary from "cloudinary";
import { queryAsync } from "./conection.controller.js";
import { Response, Request } from "express";
import { UserT, UserL } from "../Model/User.js";

// logic

const selectUsers = async (): Promise<Object | null> => {
  try {
    const result = await queryAsync(`SELECT * FROM count`, []);
    return result;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

const createUser = async (content: UserT | any) => {
  try {
    const result = await queryAsync(
      `INSERT INTO count (Username,Email,Password) VALUES (?, ?, ?)`,
      [content.nombre, content.correo_electronico, content.contraseña]
    );
    return result;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

const changeUser = async (
  id: number,
  datos: Record<string, any>
): Promise<any> => {
  const claves = Object.keys(datos);
  const valores = Object.values(datos);

  const asignaciones = claves.map((clave) => `${clave} = ?`).join(", ");

  const consulta = `UPDATE count SET ${asignaciones} WHERE id = ?`;

  const parametros = [...valores, id];

  try {
    const resultados = await queryAsync(consulta, parametros);
    console.log("Fila actualizada correctamente");
    return resultados;
  } catch (error) {
    console.error("Error al actualizar la fila:", error);
  }
};

const removeUser = async (id: number): Promise<any> => {
  try {
    const resultados = await queryAsync("DELETE FROM count WHERE id = ?", [id]);
    return resultados;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const selectUser = async (id: number): Promise<any> => {
  try {
    const result = await queryAsync("SELECT * FROM count WHERE id = ?", [id]);
    return result;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

const verifyLoggin = async (user: UserL): Promise<any> => {
  const { username, password } = user;
  try {
    const result = await queryAsync(
      "SELECT * FROM count WHERE Username=? AND Password=?",
      [username, password]
    );
    return result;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

// Route handlers

export async function getAllUser(
  req: Request,
  res: Response
): Promise<Object | null> {
  try {
    const resp = await selectUsers();
    res.status(200).json({ status: 200, data: resp });
    return { status: 200, data: resp };
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ status: 500 });
    return null;
  }
}

export async function getUser(
  req: Request,
  res: Response
): Promise<Object | null> {
  try {
    const resp = await selectUser(req.body.id);
    res.status(200).json({ status: 200, data: resp });
    return { status: 200, data: resp };
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ status: 500 });
    return null;
  }
}

export async function postUser(
  req: Request,
  res: Response
): Promise<Object | null> {
  try {
    const resp = await createUser(req.body);
    console.log(resp);
    res.status(200).json({ status: 200, data: resp });
    return { status: 200, data: resp };
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ status: 500 });
    return null;
  }
}

export async function deleteUser(
  req: Request,
  res: Response
): Promise<object | null> {
  try {
    const removeUserResult = await removeUser(req.body.id);
    res.status(200).json({ status: 200, data: removeUserResult });
    return { status: 200, data: removeUserResult };
  } catch (error: any) {
    console.error(error);
    return { status: 500 };
  }
}

export async function putUser(
  req: Request,
  res: Response
): Promise<object | null | void> {
  try {
    const { id, ...ArtistInfo } = req.body;
    console.log(req.body);
    const result = await changeUser(id, ArtistInfo);

    res.status(200).json({ status: 200, data: result });

    return { status: 200, data: result };
  } catch (error: any) {
    console.log(error);
    return { status: 500, data: error };
  }
}

export async function Logging(
  req: Request,
  res: Response
): Promise<object | null | void> {
  try {
    const { nombre, contrasenia } = req.body;
    console.log(req.body);
    const toSend = {
      username: nombre,
      password: contrasenia,
    };
    const result = await verifyLoggin(toSend);
console.log(result)
    if (result.length > 0) {
      res.status(200).json({ status: 200, data: result });
    } else {
      res.status(404).json({ status: 404, data: "Not Found" });
    }
    

    return { status: 200, data: result };
  } catch (error: any) {
    console.log(error);
    return { status: 500, data: error };
  }
}
