import { Areas } from "./areas";

export interface Responsabilidades {
    id: number;
    activo: boolean;
    nombre: string;
    descripcion: string;
    idArea: number;
    area: Areas;
}