import { Injectable } from '@angular/core';
import { Pokemon } from '../components/constants/pokemon';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';


const URL = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10/';
  
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokemons: Pokemon[];
  clickedPokemon: Pokemon;

  constructor(private http: HttpClient) { }

  getClickedPokemon(): Pokemon {
    return this.clickedPokemon;
  }
  setClickedPokemon(pokemon: Pokemon) {
    this.clickedPokemon = pokemon;
  }

  fetchPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(URL);
  }

  getPokemonsFromUrl(): Pokemon[] {
    this.fetchPokemons().forEach((objectFromUrl: any) => {
      this.extractPokemonData(objectFromUrl.results).forEach((result) => {
        let pokemons_obs = result;
        this.pokemons = result;
      });

    })
    return this.pokemons;
  }

  extractPokemonData(results: Pokemon[]): Observable<Pokemon[]> {
    const detailsObservables: Observable<{ types: string[], abilities: string[], height: number, weight: number }>[] = results.map(result => {
      return this.getPokemonDetails(result.url);
    });
  
    return forkJoin(detailsObservables).pipe(
      map(detailsArray => {
        return results.map((result, index) => ({
          id: result.url.split('/')[6],
          name: result.name,
          url: result.url,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${result.url.split('/')[6]}.png`,
          types: detailsArray[index].types,
          abilities: detailsArray[index].abilities,
          height: detailsArray[index].height,
          weight: detailsArray[index].weight
        }));
      })
    );
  }

  getPokemonDetails(url: string): Observable<{types: string[], abilities: string[], height: number, weight: number }> {
    return this.http.get<Pokemon[]>(url).pipe(
      map((response: any) => {
        const pokemonDetails = {
          types: response.types.map((type: {slot : number, type: { name: string, url: string}}) => type.type.name),
          abilities: response.abilities.map((ability: {ability : {name: string, url: string}, is_hidden: boolean, slot: number}) => ability.ability.name),
          height: response.height,
          weight: response.weight
        };
        return pokemonDetails;
      })
    );
  }
}
    