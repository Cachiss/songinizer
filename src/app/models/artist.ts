export class Artist {
    constructor(
        public id: string,
        public name: string,
        public country: string,
        public genre: number,
        public biography: string, // Biografía del artista
        public website: string, // Sitio web del artista
        public imageUrl: string // URL de la imagen del artista
    ) {}
}
