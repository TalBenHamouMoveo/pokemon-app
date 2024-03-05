import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../constants/pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../service/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})
export class PokemonDetailComponent implements OnInit{
  pokemon: Pokemon;
  name: string;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService, private router: Router) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];
    this.pokemon = this.pokemonService.getClickedPokemon();
  }

  onClick() {
    this.router.navigate(['']);
  }

}
