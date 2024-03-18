import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Artist } from '../../models/artist';
import { typeGenre } from '../../models/genre';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  artists: Artist[] = []; // Lista de artistas
  newArtist: Artist = {
    id: '', // El ID será asignado automáticamente por Firestore
    name: '',
    country: '',
    genre: 0, // Aquí puedes establecer el valor predeterminado como 0 o cualquier otro número
    biography: '',
    website: '',
    imageBase64: '' // Agrega la propiedad para la imagen en base64
  };
  genres: typeGenre[] = []; // Lista de géneros
  addingArtist: boolean = false; // Para indicar si se está agregando un artista
  imageFile: File | null = null; // Variable para almacenar el archivo de imagen seleccionado

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.loadArtists(); // Cargar los artistas al inicializar el componente
    this.loadGenres(); // Cargar los géneros al inicializar el componente
  }

  loadArtists(): void {
    this.userService.getArtists().subscribe(
      (artists: Artist[]) => {
        this.artists = artists; // Asignar los artistas recuperados
      },
      (error: any) => {
        console.error('Error al cargar los artistas:', error);
      }
    );
  }

  loadGenres(): void {
    this.genres = this.userService.getGenres(); // Obtener la lista de géneros
  }

  async addArtist(): Promise<void> {
    this.addingArtist = true; // Indicar que se está agregando un artista
  
    try {
      if (this.imageFile !== null) {
        // Solo llama a insertArtist si imageFile no es nulo
        await this.userService.insertArtist(this.newArtist, this.imageFile); // Pasar el archivo de imagen al servicio
      } else {
        console.error('No se ha seleccionado ningún archivo de imagen.');
        return;
      }
      console.log('Artista agregado exitosamente');
      this.loadArtists(); // Recargar la lista de artistas después de agregar uno nuevo
    } catch (error) {
      console.error('Error al agregar el artista:', error);
    } finally {
      this.addingArtist = false; // Restablecer el estado después de agregar el artista
      this.resetForm(); // Reiniciar el formulario
    }
  }
  

  resetForm(): void {
    // Reiniciar el formulario para agregar un nuevo artista
    this.newArtist = {
      id: '', // El ID será asignado automáticamente por Firestore
      name: '',
      country: '',
      genre: 0, // Restaura el valor predeterminado
      biography: '',
      website: '',
      imageBase64: '' // Restablece la imagen en base64
    };
    this.imageFile = null; // Restablece el archivo de imagen seleccionado
  }

  getGenreDescription(genreId: number): string {
    const genre = this.genres.find(genre => genre.id === genreId);
    return genre ? genre.description : '';
  }

  // Método para manejar la selección de archivos de imagen
  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.imageFile = files[0]; // Asignar el primer archivo de la lista
    }
  }
}
