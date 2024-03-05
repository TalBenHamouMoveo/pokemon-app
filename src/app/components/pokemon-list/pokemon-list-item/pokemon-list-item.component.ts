import { Component, Input } from '@angular/core';
import { Pokemon } from '../../../constants/pokemon';
import { PokemonService } from '../../../service/pokemon.service';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrl: './pokemon-list-item.component.scss'
})
export class PokemonListItemComponent {
  @Input() pokemon: Pokemon;

  onClick(pokemon: Pokemon) {
    this.pokemonService.setClickedPokemon(pokemon);
  }

  constructor(private pokemonService: PokemonService) { }
}
