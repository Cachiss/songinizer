import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Importa los módulos de ngx-bootstrap
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Importa módulos de AngularFire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { Top50MexComponent } from './components/top-50-mex/top-50-mex.component';
import { Top50GlobalComponent } from './components/top-50-global/top-50-global.component';
import { HomeComponent } from './pages/home/home.component';
import { MySongsComponent } from './pages/my-songs/my-songs.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { ResultSearchComponent } from './components/result-search/result-search.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Top50MexComponent,
    Top50GlobalComponent,
    HomeComponent,
    MySongsComponent,
    AboutUsComponent,
    ArtistsComponent,
    ResultSearchComponent,
    FeedbackComponent // Agrega el componente ArtistComponent a las declaraciones
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, // Necesario para las animaciones del calendario
    BsDatepickerModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializa Firebase con la configuración
    AngularFireDatabaseModule, // Agrega el módulo de Firebase Database
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
