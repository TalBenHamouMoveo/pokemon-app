import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../../service/pokemon.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent{
  email: string = ''; 
  private desiredEmail: string = "demo@skills.co.il";
  message: string;

  constructor(private router: Router, private pokemonService: PokemonService) { }

  onSubmit() {
    if (this.checkEmail()) {
      this.router.navigate(['/home']);
      localStorage.setItem('loginMember', this.email);
      this.pokemonService.setLogInStatus(true);
    }
    else {
      this.message = "Unauthorized email address";
    }
  }

  checkEmail() {
    if (this.email === this.desiredEmail)
      return true;
    return false;
  }
}
