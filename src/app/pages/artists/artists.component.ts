import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Artist } from '../../models/artist';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.css'
})
export class ArtistsComponent implements OnInit {
  artists : Artist[] = [];
  loading : boolean = true;
  constructor(private userService: UsersService){}

  ngOnInit(): void {
    this.userService.getArtists().subscribe((data: any) => {
      this.artists = data.map((artist: any) => {
        return {
          id: artist.id,
          name: artist.name,
          genre: artist.genre,
          image: artist.image,
          id_user: artist.id_user
        }
      });
      this.loading = false;
    }
    );
  }

  async deleteArtist(artist: Artist){
    this.artists = this.artists.filter(a => a.id !== artist.id);
    await this.userService.deleteArtist(artist.id);
  }
}
