import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service';
import { Pokemon } from '../../constants/pokemon';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  pokemons: Pokemon[];
  filteredPokemons: Pokemon[] = [];
  searchInput: string = '';
  recentSearches: string[] = [];

  constructor(private pokemonService: PokemonService, private router: Router) { 
  }
  
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('loginMember')) {
      this.getObsPokemons().subscribe((pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
        this.filteredPokemons = pokemons;
        if (localStorage.getItem('recentSearch') != undefined)
          this.recentSearches = JSON.parse(localStorage.getItem('recentSearch'));
        this.pokemonService.setPokemonList(this.pokemons);
      });
    }
    else {
      this.router.navigate(['']);
    }
  }
  getObsPokemons() : Observable<Pokemon[]> {
    return this.pokemonService.getObservablePokemonsFromUrl();
  }

  filterPokemons() {
    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchInput.toLowerCase())
    );
    if (this.searchInput != '')
      this.addRecentSearch(this.searchInput);
  }

  addRecentSearch(searchInput: string) {
    this.recentSearches = [searchInput].concat(this.recentSearches);

    if (this.recentSearches.length > 5) {
      this.recentSearches.pop();
    }
    localStorage.setItem('recentSearch', JSON.stringify(this.recentSearches));
  }

  inputTrigger() {
    if (this.searchInput === '') {
      this.filteredPokemons = this.pokemons;
    }
  }


  search() {
    this.filterPokemons();
    
  }
}
