import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient ) { }
  
  private getAccessToken() {
    const client_id = environment.spotifyConfig.client_id;
    const client_secret = environment.spotifyConfig.client_secret;

    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(client_id + ':' + client_secret),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    //el body se envia como formato urlencoded
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
  

    return this.http.post<any>('https://accounts.spotify.com/api/token', body.toString(), { headers });

  }

  getTopTracksMexico(){
    const url = "https://api.spotify.com/v1/playlists/37i9dQZEVXbO3qyFxbkOE1"
    return this.getAccessToken().pipe(
      switchMap((data) => {
        const token = data.access_token;
        const headers = new HttpHeaders({
          Authorization: 'Bearer ' + token
        });
        return this.http.get(url, { headers });
      })
    )
  }

  getTopTracksGlobal(){
    const url = "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF"
    return this.getAccessToken().pipe(
      switchMap((data) => {
        const token = data.access_token;
        const headers = new HttpHeaders({
          Authorization: 'Bearer ' + token
        });
        return this.http.get(url, { headers });
      })
    )
  }


  
}
