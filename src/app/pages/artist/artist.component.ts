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
    imageUrl: ''
  };
  genres: typeGenre[] = []; // Lista de géneros
  addingArtist: boolean = false; // Para indicar si se está agregando un artista

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
      await this.userService.insertArtist(this.newArtist);
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
      imageUrl: ''
    };
  }

  getGenreDescription(genreId: number): string {
    const genre = this.genres.find(genre => genre.id === genreId);
    return genre ? genre.description : '';
  }
}
