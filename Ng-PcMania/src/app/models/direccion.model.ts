export class Direccion {
    constructor(
        public nombre: string,
        public apellidos: string,
        public email: string,
        public dni: string,
        public fecha_nacimiento: Date,
        public telefono: number,
        public direccion: string,
        public cp: number,
        public poblacion: string,
        public provincia: string,
        public direccion_id?: number
    ) {}
}