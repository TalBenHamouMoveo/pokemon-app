import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../constants/pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../service/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})
export class PokemonDetailComponent implements OnInit{
  pokemon: Pokemon;
  id: string;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.pokemonService.getPokemonsList() == undefined) 
      this.pokemonService.getPokemonsFromUrl();

    this.pokemon = this.pokemonService.getPokemonsList().filter(pokemon => pokemon.id === this.id).at(0);
  }

  onClick() {
    this.router.navigate(['']);
  }

}
