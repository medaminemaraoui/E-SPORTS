import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: false,

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  customerFormGroup!: FormGroup;
  userId!: string;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) {}

  ngOnInit() {
    // Get the userId from the route parameter
    this.userId = this.activatedRoute.snapshot.params['id'];

    // Check if the user is authenticated using AuthService
    if (this.authService.isAuthenticated && this.authService.username) {
      // Populate the form with data from AuthService
      this.customerFormGroup = this.fb.group({
        userId: this.fb.control(this.userId),
        name: this.fb.control(this.authService.username), // Get username from AuthService
        roles: this.fb.control(this.authService.roles),
        email: this.fb.control(''), // You might want to add email information from AuthService if available
      });
    } else {
      // Handle case when the user is not authenticated, e.g., navigate to login
      console.log('User not authenticated');
      // Optionally, redirect to login
      // this.router.navigateByUrl("/login");
    }
  }
}

