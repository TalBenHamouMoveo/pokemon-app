import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit{
  email: string = ''; 

  constructor(private router: Router) { }

  onSubmit() {
    console.log('Email submitted:', this.email);
    if (this.email === "demo@skills.co.il") {
      this.router.navigate(['/home']);
      localStorage.setItem('loginMember', this.email);
    }
  }

  ngOnInit(): void {
  }
}
