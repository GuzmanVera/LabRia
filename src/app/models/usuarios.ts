import { Personas } from "./personas";

export interface Usuarios {
    id: number;
    username : string;
    email: string;
    persona : Personas;
    activo: boolean;
    imagen : string;
}