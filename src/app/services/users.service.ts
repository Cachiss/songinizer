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

  private addFavoriteLocalStorage(song: Song): void {
    let favoritesSongsRaw: any = localStorage.getItem('favorites');
    let favoritesSongs: string[] = favoritesSongsRaw ? favoritesSongsRaw.split(',') : [];
    favoritesSongs.push(song.id);
    localStorage.setItem('favorites', favoritesSongs.join(','));
  }
  private removeFavoriteLocalStorage(songId: string): void {    
    let favoritesSongsRaw: any = localStorage.getItem('favorites');
    let favoritesSongs: string[] = favoritesSongsRaw.split(',');

    favoritesSongs = favoritesSongs.filter(song => song !== songId);
    localStorage.setItem('favorites', favoritesSongs.join(','));
  }

  isFavoriteLocalStorage(songId: string): boolean {
    let favoritesSongsRaw: any = localStorage.getItem('favorites');
    let favoritesSongs: string[] = favoritesSongsRaw ? favoritesSongsRaw.split(',') : [];
    return favoritesSongs.includes(songId);
  }
  getSongs(id_user: string): Observable<Song[]> {
    return this.songsCollection.valueChanges({ idField: 'id' }).pipe(
      map((songs: Song[]) => {
        return songs.filter(song => song.id_user === id_user);
      })
    );
  }

  getGenres(): typeGenre[] {
    return this.genres;
  }

  insertSong(song: Song): Promise<any> {
    this.addFavoriteLocalStorage(song);
    //this to set a custom id 
    return this.songsCollection.doc(song.id).set({
      ...song,
      id_user: localStorage.getItem('token')!
    });
  }

  updateSong(song: Song): void {
    const songDoc = this.songsCollection.doc(song.id);
    songDoc.update(song);
  }

  deleteSong(songId: string): Promise<void> {
    this.removeFavoriteLocalStorage(songId);
    const songDoc = this.songsCollection.doc(songId);
    return songDoc.delete();
  }

  isArtistLocalStorage(artistId: string): boolean {
    let favoritesArtistsRaw: any = localStorage.getItem('favoritesArtists');
    let favoritesArtists: string[] = favoritesArtistsRaw ? favoritesArtistsRaw.split(',') : [];
    return favoritesArtists.includes(artistId);
  
  }


/*  getArtistById(artistId: string): Observable<Artist | undefined> {
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
  }*/

 /*getSongsWithArtists(): Observable<Song[]> {
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
  }*/
  private insertArtistLocalStorage(artist: Artist): void {
    let favoritesArtistsRaw: any = localStorage.getItem('favoritesArtists');
    let favoritesArtists: string[] = favoritesArtistsRaw ? favoritesArtistsRaw.split(',') : [];
    favoritesArtists.push(artist.id);
    localStorage.setItem('favoritesArtists', favoritesArtists.join(','));
  }

  insertArtist(artist: Artist): Promise<any> {
    this.insertArtistLocalStorage(artist);
    return this.artistsCollection.doc(artist.id).set({
      ...artist,
      id_user: localStorage.getItem('token')!
    });
  }

  // Método para obtener la lista de artistas
  getArtists(): Observable<Artist[]> {
    const id_user = localStorage.getItem('token');
    return this.artistsCollection.valueChanges({ idField: 'id' }).pipe(
      map((artists: Artist[]) => {
        return artists.filter(artist => artist.id_user === id_user);
      })
    );
  }

  deleteArtistLocalStorage(artistId: string): void {
    let favoritesArtistsRaw: any = localStorage.getItem('favoritesArtists');
    let favoritesArtists: string[] = favoritesArtistsRaw.split(',');

    favoritesArtists = favoritesArtists.filter(artist => artist !== artistId);
    localStorage.setItem('favoritesArtists', favoritesArtists.join(','));
  
  }
  deleteArtist(artistId: string): Promise<void> {
    this.deleteArtistLocalStorage(artistId);
    const artistDoc = this.artistsCollection.doc(artistId);
    return artistDoc.delete();
  }
}
