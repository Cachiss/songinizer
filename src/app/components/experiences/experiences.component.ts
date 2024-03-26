import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';


type Experience = {
  name: string;
  email: string;
  date: any;
  message: string;

}

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.css'
})
export class ExperiencesComponent implements OnInit {
  
  slides : Experience[] = [];
  isLoaded = false;
  constructor(private userService: UsersService) { }

  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }
  ngOnInit(): void {
    this.userService.getFeedback().subscribe((data: any) => {
      this.slides = data.map((experience: any) => {
        return {
          name: experience.name,
          email: experience.email,
          date: experience.date,
          message: experience.message
        }
      });

      this.isLoaded = true;
    }
    );
    
  }
}
