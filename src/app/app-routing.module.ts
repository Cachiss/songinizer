import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MySongsComponent } from './pages/my-songs/my-songs.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'artists',
    component: ArtistsComponent
  },
  {
    path: 'my-songs',
    component: MySongsComponent
  },
  {
    path: 'experience-feedback',
    component: FeedbackComponent
  
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
