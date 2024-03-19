import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Song } from '../../models/songs';

@Component({
  selector: 'app-my-songs',
  templateUrl: './my-songs.component.html',
  styleUrl: './my-songs.component.css'
})
export class MySongsComponent implements OnInit {
  constructor(private userService: UsersService) { }
  songs : Song[] = [];
  loading : boolean = true;

  ngOnInit(): void {
    this.userService.getSongs(localStorage.getItem('token')!).subscribe((data: any) => {

      this.songs = data.map((song: any) => {                
        return {
          id: song.id,
          name: song.name,
          artists: song.artists,
          favorite: song.favorite,
          releaseYear: song.releaseYear,
          album: song.album,
          image: song.image
        }
      });
      this.loading = false;
    }
    );
  }

  async deleteSong(song: Song){
    this.songs = this.songs.filter((s) => s.id !== song.id);
    await this.userService.deleteSong(song.id);
  }
}
