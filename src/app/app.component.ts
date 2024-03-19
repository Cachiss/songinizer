import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'songinizer';

  ngOnInit(): void {
    console.log(uuidv4())
    if(!localStorage.getItem('token')){
      localStorage.setItem('token', uuidv4());
    }
  }
}
