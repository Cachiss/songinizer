export class Song {
    constructor(
        public id: string,
        public title: string,
        public artists: string [], // ID del artista asociado a la canción
        public album: string,
        public releaseYear: string,
        public description: string,
        public image: string // Imagen en base64 de la canción
    ) {}
}
