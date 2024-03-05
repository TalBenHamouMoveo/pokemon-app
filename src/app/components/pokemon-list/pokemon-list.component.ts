import { Component, Input } from '@angular/core';
import { Pokemon } from '../../constants/pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent {
  @Input() pokemonList: Pokemon[];

}
