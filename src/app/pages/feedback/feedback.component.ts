import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  feedbackForm!: FormGroup ;

  isSubmitted = false;

  constructor(private fb: FormBuilder) {
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

  onSubmit() {
    this.isSubmitted = true;
    if (this.feedbackForm.valid) {

    } else {
      console.log('Formulario inválido');

      setTimeout(() => {
        this.isSubmitted = false;
      }, 2000);
    }


  }

} 
