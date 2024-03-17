import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Artist } from '../models/artist';
import { typeGenre } from '../models/genre';
import { Songs } from '../models/songs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private songsCollection: AngularFirestoreCollection<Songs>;
  private genres: typeGenre[] = [];
  private artistsCollection: AngularFirestoreCollection<Artist>;

  constructor(private firestore: AngularFirestore) {
    this.songsCollection = this.firestore.collection<Songs>('songs');
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

  getSongs(): Observable<Songs[]> {
    return this.songsCollection.valueChanges({ idField: 'id' });
  }

  getGenres(): typeGenre[] {
    return this.genres;
  }

  insertSong(song: Songs): void {
    this.songsCollection.add(song);
  }

  updateSong(song: Songs): void {
    const songDoc = this.songsCollection.doc(song.id);
    songDoc.update(song);
  }

  deleteSong(songId: string): void {
    const songDoc = this.songsCollection.doc(songId);
    songDoc.delete();
  }

  newSong(): Songs {
    return {
      id: '', // Se asignará un ID vacío que será generado por Firestore
      album: '',
      artistId: '', // Cambiar de artist a artistId para almacenar el ID del artista
      genre: 0,
      title: '',
      releaseYear: 0,
      description: ''
    };
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
            imageUrl: artist.imageUrl
          };
        } else {
          return undefined;
        }
      })
    );
  }

  getSongsWithArtists(): Observable<Songs[]> {
    return this.getSongs().pipe(
      switchMap((songs: Songs[]) => {
        const songObservables: Observable<Songs>[] = songs.map(song => {
          return this.getArtistById(song.artistId).pipe(
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

  insertArtist(artist: Artist): void {
    this.artistsCollection.add(artist);
  }

  // Método para obtener la lista de artistas
  getArtists(): Observable<Artist[]> {
    return this.artistsCollection.valueChanges({ idField: 'id' });
  }
}
