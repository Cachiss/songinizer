
import { Component, OnInit } from '@angular/core';
import { Songs } from '../../models/songs';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-list-songs',
  templateUrl: './list-songs.component.html',
  styleUrl: './list-songs.component.css'
})
export class ListSongsComponent implements OnInit {

  songs: Songs[] = [];
  editingSong: Songs | null = null; // Objeto para editar canción

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getSongs().subscribe((songs: Songs[]) => {
      this.songs = songs;
    });
  }

  editSong(song: Songs) {
    this.editingSong = { ...song }; // Copia la canción seleccionada para editar
  }
  
  saveSong() {
    if (this.editingSong) {
      // Actualiza la canción en la base de datos
      this.userService.updateSong(this.editingSong);
      this.editingSong = null; // Limpia la variable de edición
    }
  }
  
  cancelEdit() {
    this.editingSong = null; // Cancela la edición y limpia la variable
  }


  deleteSong(songId: string) {
    // Llama al método de servicio para eliminar la canción
    this.userService.deleteSong(songId);
  }

}
