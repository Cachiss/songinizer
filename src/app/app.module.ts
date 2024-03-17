import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistComponent } from './pages/artist/artist.component'; // Importa el componente ArtistComponent
import { SongsComponent } from './pages/songs/songs.component';
// Importa los módulos de ngx-bootstrap
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Importa módulos de AngularFire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { ListSongsComponent } from './pages/list-songs/list-songs.component';

@NgModule({
  declarations: [
    AppComponent,
    SongsComponent,
    ListSongsComponent,
    ArtistComponent // Agrega el componente ArtistComponent a las declaraciones
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, // Necesario para las animaciones del calendario
    BsDatepickerModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializa Firebase con la configuración
    AngularFireDatabaseModule // Agrega el módulo de Firebase Database
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
