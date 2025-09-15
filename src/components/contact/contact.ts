import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import emailjs from 'emailjs-com';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact implements OnInit {
  contactForm: FormGroup;
  isSubmitting: boolean = false;
  submitMessage: string = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    emailjs.init("vDB-PGnZ5UfOEH2wE");
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitMessage = '';
      this.messageType = '';

      try {
        const response = await emailjs.send(
          'service_gcls699',
          'template_heldfed',
          {
            name: this.contactForm.value.name,
            email: this.contactForm.value.email,
            subject: this.contactForm.value.subject,
            message: this.contactForm.value.message
          }
        );

        this.submitMessage = 'Message sent successfully! I\'ll get back to you soon.';
        this.messageType = 'success';
        this.contactForm.reset();
      } catch (error) {
        console.error('Failed to send message:', error);
        this.submitMessage = 'Failed to send message. Please try again later.';
        this.messageType = 'error';
      } finally {
        this.isSubmitting = false;
        
        setTimeout(() => {
          this.submitMessage = '';
          this.messageType = '';
        }, 5000);
      }
    } else {
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }
}