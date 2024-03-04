import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../../../shared/pokemon';
import { PokemonService } from '../../../shared/pokemon.service';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrl: './pokemon-list-item.component.scss'
})
export class PokemonListItemComponent implements OnInit{
  @Input() pokemon: Pokemon;

  onClick(pokemon: Pokemon) {
    this.pokemonService.setClickedPokemon(pokemon);
  }

  constructor(private pokemonService: PokemonService) { }
  
  ngOnInit(): void {
  }
}
