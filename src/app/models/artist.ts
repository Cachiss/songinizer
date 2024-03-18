export class Artist {
    constructor(
      public id: string,
      public name: string,
      public country: string,
      public genre: number,
      public biography: string,
      public website: string,
      public imageBase64: string // Imagen del artista en formato Base64
    ) {}
  }
  