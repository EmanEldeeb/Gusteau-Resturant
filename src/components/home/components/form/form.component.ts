import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  name = '';
  email = '';
  message = '';
  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs
      .sendForm(
        'Gusteau',
        'template_21ob6uu',
        e.target as HTMLFormElement,
        'YWNSBgVw9nUJlPh3I'
      )
      .then(
        (result: EmailJSResponseStatus) => {},
        (error) => {
          console.log(error.text);
        }
      );
  }

  restField() {
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
