export class Song {
    constructor(
        public id: string,
        public title: string,
        public artistId: string, // ID del artista asociado a la canción
        public album: string,
        public releaseYear: number,
        public description: string,
        public genre: number,
        public imageBase64: string // Imagen en base64 de la canción
    ) {}
}
