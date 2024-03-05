import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service';
import { Pokemon } from '../../components/constants/pokemon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  pokemons: Pokemon[];
  searchInput: string = '';
  filterPokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) { }
  
  getPokemons() {
    this.pokemons = this.pokemonService.getPokemonsFromUrl();
  }
  ngOnInit(): void {
    this.getPokemons();
  }

}
