import { Component } from '@angular/core';
import { Artist } from '../../models/artist';
import { Song } from '../../models/songs';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html',
  styleUrl: './result-search.component.css'
})
export class ResultSearchComponent {
  isSearch : Boolean = false;
  artists : Artist[] = [];
  songs : Song[] = [];
  

  searchValue : string = '';
  optionValue : string = 'artist';
  constructor(private spotify : SpotifyService, private userService: UsersService) { }


  async addArtist(artist: Artist){
    await this.userService.insertArtist(artist);
  }

  async deleteArtist(artist: Artist){
    await this.userService.deleteArtist(artist.id);
  }

  isArtistFavorite(artist_id : string): boolean {
    return this.userService.isArtistLocalStorage(artist_id);
  }

  isSongFavorite(song_id : string): boolean {
    return this.userService.isFavoriteLocalStorage(song_id);
  }

  async addSong(song: Song){
    await this.userService.insertSong(song);
  }

  async deleteSong(song: Song){
    await this.userService.deleteSong(song.id);
  }

  search(){
    if(this.searchValue.trim() === ''){
      this.isSearch = false;
      return;
    }
    this.isSearch = true;

    this.spotify.search(this.searchValue, this.optionValue).subscribe((data: any) => {
      console.log(data)
      switch(this.optionValue){
        case 'artist':
          this.artists = data.artists.items.map((artist: any) => {
            return {
              id: artist.id,
              name: artist.name,
              image: artist.images[1]?.url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
              genre: artist.genres.join(', '),
            }
          }).slice(0,5);
          break;
        case 'track':
          this.songs = data.tracks.items.map((song: any) => {
            return {
              id: song.id,
              name: song.name,
              artists: song.artists.map((artist:any) => artist.name).join(', '),
              releaseYear: song.album.release_date,
              album: song.album.name,
              image: song.album.images[1].url || song.album.images[0].url
            }
          });
          break;
          default:
            break;
      }
    });
  }
}
