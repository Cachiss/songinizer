import { Component } from '@angular/core';

import { SpotifyService } from '../../services/spotify/spotify.service';
import { Song } from '../../models/songs';

import { v4 as uuidv4 } from 'uuid';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-top-50-global',
  templateUrl: './top-50-global.component.html',
  styleUrl: './top-50-global.component.css'
})
export class Top50GlobalComponent {
  songs : Song[] = [];

  constructor(private spotifyService: SpotifyService, private userService: UsersService) { }
 
  ngOnInit(): void {
    this.spotifyService.getTopTracksGlobal().subscribe((data: any) => {
      this.songs = data.tracks.items.map((song: any) => {        
        return {
          id: song.track.id,
          name: song.track.name,
          artists: song.track.artists.map((artist:any) => artist.name).join(', '),
          favorite: this.userService.isFavoriteLocalStorage(song.track.id),
          releaseYear: song.track.album.release_date,
          album: song.track.album.name,
          image: song.track.album.images[1].url || song.rack.album.images[0].url,
        }
      }).slice(0, 20);
    }
    );
  }

  async addSong(song: Song){
    song.favorite = true;
    await this.userService.insertSong(song);
  }

  async deleteSong(song: Song){
    song.favorite = false;
    await this.userService.deleteSong(song.id);
  }

}
