import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { Song } from '../../models/songs';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-top-50-mex',
  templateUrl: './top-50-mex.component.html',
  styleUrl: './top-50-mex.component.css'
})
export class Top50MexComponent implements OnInit {

  songs : Song[] = [];
  constructor(private spotifyService: SpotifyService) { }
 
  ngOnInit(): void {
    this.spotifyService.getTopTracksMexico().subscribe((data: any) => {
      this.songs = data.tracks.items.map((song: any) => {        
        return {
          id: uuidv4(),
          name: song.track.name,
          artists: song.track.artists.map((artist:any) => artist.name).join(', '),
          releaseYear: song.track.album.release_date,
          album: song.track.album.name,
          image: song.track.album.images[1].url || song.rack.album.images[0].url
        }
      }).slice(0, 20);
    }
    );
  }

}
