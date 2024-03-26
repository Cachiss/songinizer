import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  feedbackForm!: FormGroup ;

  isSubmitted = false;

  constructor(private fb: FormBuilder, private userService: UsersService) {
    this.feedbackForm = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z ]*$')//solo letras 
    ]],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    date: ['', [
      Validators.required
    ]],
    message: ['', [
      Validators.required,
      Validators.minLength(10)
    ]]
    });
  }

  resetForm() {
    this.isSubmitted = false;
    this.feedbackForm.reset();
  }

  async onSubmit() {
    this.isSubmitted = true;
    if (this.feedbackForm.valid) {
      await this.userService.addFeedback(this.feedbackForm.value);
      alert('Gracias por describir tu experencia');
      this.resetForm();
    } else {
      console.log('Formulario inválido');

      setTimeout(() => {
        this.isSubmitted = false;
      }, 2000);
    }


  }

} 
