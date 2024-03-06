import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service';
import { Pokemon } from '../../constants/pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  pokemons: Pokemon[];
  filteredPokemons: Pokemon[] = [];
  searchTerm: string = '';
  recentSearches: string[];


  constructor(private pokemonService: PokemonService, private router: Router) { 
  }
  
  getPokemons() {
    this.pokemons = this.pokemonService.getPokemonsFromUrl();
  }

  ngOnInit(): void {
    if (localStorage.getItem('loginMember')) {
      this.getPokemons();
      this.recentSearches = JSON.parse(localStorage.getItem('recentSearch'));
      console.log('this.pokemons :>> ', this.pokemons);
    }
  }

  filterPokemons() {
    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.addRecentSearch(this.searchTerm);
  }

  addRecentSearch(searchTerm: string) {
    console.log('before insert this.recentSearches :>> ', this.recentSearches);
    this.recentSearches = [searchTerm].concat(this.recentSearches);

    if (this.recentSearches.length > 5) {
      this.recentSearches.pop();
    }

    console.log('after insert this.recentSearches :>> ', this.recentSearches);

    localStorage.setItem('recentSearch', JSON.stringify(this.recentSearches));
  }

  logOut() {
    localStorage.removeItem('loginMember');
    this.router.navigate(['']);
  }

}
