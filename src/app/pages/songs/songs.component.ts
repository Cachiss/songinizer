import { Component, OnInit } from '@angular/core';
import { typeGenre } from '../../models/genre';
import { Songs } from '../../models/songs';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

   songs: Songs = this.userservice.newSong(); // Inicializar songs con un nuevo objeto de canción
   genres: typeGenre[] = [];
   savedSongs: Songs[] = [];
   imageFile: File | null = null; // Variable para almacenar el archivo de imagen seleccionado
   
   constructor(private userservice: UsersService) {}

   ngOnInit(): void {
     this.genres = this.userservice.getGenres();
     this.getSavedSongs();
   }

   insertSong() {
     // Asigna el archivo de imagen seleccionado al campo imageBase64 de songs
     if (this.imageFile !== null) {
       const reader = new FileReader();
       reader.readAsDataURL(this.imageFile);
       reader.onload = () => {
         this.songs.imageBase64 = reader.result as string;
         // Inserta la canción en la base de datos
         this.userservice.insertSong(this.songs);
         // Reinicia el formulario
         this.resetForm();
       };
     } else {
       console.error('No se ha seleccionado ningún archivo de imagen.');
     }
   }

   getSavedSongs() {
     this.userservice.getSongs().subscribe(songs => {
       this.savedSongs = songs;
     });
   }

   resetForm(): void {
     // Reinicia el objeto songs a una nueva canción y el archivo de imagen a null
     this.songs = this.userservice.newSong();
     this.imageFile = null;
   }

   // Maneja la selección de archivos de imagen
   onFileSelected(event: any): void {
     const files: FileList = event.target.files;
     if (files && files.length > 0) {
       this.imageFile = files[0];
     }
   }
}
