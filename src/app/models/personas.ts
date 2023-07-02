import { TipoDeDocumento } from "./tipo-de-documento";

export interface Personas {
    id: number;
    activo: boolean;
    idTipoDeDocumento: number;
    tipoDeDocumento: TipoDeDocumento
    documento: string;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
}