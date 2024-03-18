import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Artist } from '../models/artist';
import { typeGenre } from '../models/genre';
import { Song } from '../models/songs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private songsCollection: AngularFirestoreCollection<Song>;
  private genres: typeGenre[] = [];
  private artistsCollection: AngularFirestoreCollection<Artist>;

  constructor(private firestore: AngularFirestore) {
    this.songsCollection = this.firestore.collection<Song>('songs');
    this.genres = [
      { id: 0, description: 'sin definir' }, 
      { id: 1, description: 'Rock' },
      { id: 2, description: 'Electronica' },
      { id: 3, description: 'Pop' },
      { id: 4, description: 'Metalica' },
      { id: 5, description: 'Trash Metal' },
      { id: 6, description: 'Clasica' }
    ];
    this.artistsCollection = this.firestore.collection<Artist>('artists');
  }

  getSongs(): Observable<Song[]> {
    return this.songsCollection.valueChanges({ idField: 'id' });
  }

  getGenres(): typeGenre[] {
    return this.genres;
  }

  insertSong(song: Song): void {
    this.songsCollection.add(song);
  }

  updateSong(song: Song): void {
    const songDoc = this.songsCollection.doc(song.id);
    songDoc.update(song);
  }

  deleteSong(songId: string): void {
    const songDoc = this.songsCollection.doc(songId);
    songDoc.delete();
  }



  getArtistById(artistId: string): Observable<Artist | undefined> {
    return this.firestore.collection('artists').doc(artistId).valueChanges().pipe(
      map((artist: any) => {
        if (artist) {
          return {
            id: artist.id,
            name: artist.name,
            country: artist.country,
            genre: artist.genre,
            biography: artist.biography,
            website: artist.website,
            imageBase64: artist.imageBase64 // Cambiar imageUrl a imageBase64
          } as Artist; // Agregar 'as Artist' para convertirlo en tipo Artist
        } else {
          return undefined;
        }
      })
    );
  }

  getSongsWithArtists(): Observable<Song[]> {
    return this.getSongs().pipe(
      switchMap((songs: Song[]) => {
        const songObservables: Observable<Song>[] = songs.map(song => {
          return this.getArtistById(song.id).pipe(
            map(artist => {
              return {
                ...song,
                artist: artist ? artist : null
              };
            })
          );
        });
        return forkJoin(songObservables);
      })
    );
  }

  insertArtist(artist: Artist, imageFile: File): void {
    // Verifica si se proporcionó una imagen
    if (imageFile) {
      // Lee la imagen como una cadena Base64
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        // Cuando la imagen se ha leído correctamente, agrega la cadena Base64 al objeto del artista
        artist.imageBase64 = reader.result as string;

        // Agrega el artista con la imagen a la base de datos
        this.artistsCollection.add(artist);
      };
      reader.onerror = (error) => {
        console.error('Error al leer la imagen:', error);
      };
    } else {
      // Si no se proporcionó una imagen, simplemente agrega el artista a la base de datos sin imagen
      this.artistsCollection.add(artist);
    }
  }

  // Método para obtener la lista de artistas
  getArtists(): Observable<Artist[]> {
    return this.artistsCollection.valueChanges({ idField: 'id' });
  }
}
