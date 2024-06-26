import { Areas } from "./areas";

export interface Llamados {
    miembrosTribunal: any;
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