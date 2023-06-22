import { Areas } from "./areas";

export interface Llamados {
    id: number;
    activo: boolean;
    identificador: string;
    nombre: string;
    linkPlanillaPuntajes: string;
    linkActa: string;
    minutosEntrevista: number;
    idArea: number;
    area: Areas;
}