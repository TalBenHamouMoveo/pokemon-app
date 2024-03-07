import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../../service/pokemon.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  title = 'Pokemon';
  logInStatus: boolean = false;
  private desiredEmail: string = "demo@skills.co.il";
  
  constructor(private router: Router, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('loginMember') != undefined && localStorage.getItem('loginMember') === this.desiredEmail)
      this.logInStatus = true;

    this.pokemonService.getLogInSub().subscribe((value: boolean) => {
      this.logInStatus = value;
    })
  }

  logOut() {
    this.logInStatus = false;
    localStorage.removeItem('loginMember');
    this.router.navigate(['']);
  }
}
