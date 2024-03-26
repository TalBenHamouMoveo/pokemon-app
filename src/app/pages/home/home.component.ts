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
  types: string[] = [];
  selectedType: string = 'All';

  constructor(private pokemonService: PokemonService, private router: Router) { 
  }
  
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('loginMember')) {
      this.getObsPokemons().subscribe((pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
        this.collectUniqueTypes();
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
    this.filteredPokemons = this.filteredPokemons.filter(pokemon =>
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

  collectUniqueTypes(): void {
    const allTypes: string[] = [];
    this.pokemons.forEach(pokemon => {
      pokemon.types.forEach(type => {
        if (!allTypes.includes(type)) {
          allTypes.push(type);
        }
      });
    });
    this.types = allTypes.sort((a, b) => a.localeCompare(b));
  }

  filterByType(): void {
    if (this.selectedType === 'All') {
      this.filteredPokemons = this.pokemons;
    } else {
      this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.types.includes(this.selectedType));
    }
  }

  search() {
    this.filterPokemons();
    
  }
}
