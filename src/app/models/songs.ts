export class Song {
    constructor(
        public id: string,
        public name: string,
        public artists: string, // ID del artista asociado a la canción
        public album: string,
        public releaseYear: string,
        public image: string, // Imagen en base64 de la canción
        public favorite: boolean = false // Indica si la canción es favorita
    ) {}
}
