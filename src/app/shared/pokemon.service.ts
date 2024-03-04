import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';


const URL = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100/';
  
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

  fetchPokemons(): Observable<any> {
    return this.http.get<any>(URL);
  }

  getPokemonsFromUrl(): Pokemon[] {
    this.fetchPokemons().subscribe((response: any) => {
      this.extractPokemonData(response.results).subscribe((result) => {
        this.pokemons = result;
      });
    });
    return this.pokemons;
  }

  getPokemonDetails(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  extractPokemonData(results: any[]): Observable<any[]> {
    // Create an array of observables for getPokemonTypes
    const typeObservables: Observable<string[]>[] = results.map(result => {
        return this.getPokemonTypes(result.url);
    });

    // Combine all observables into a single observable using forkJoin
    return forkJoin(typeObservables).pipe(
        map(typesArray => {
            // Map each result and assign the corresponding types
            return results.map((result, index) => ({
                id: result.url.split('/')[6],
                name: result.name,
                url: result.url,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${result.url.split('/')[6]}.png`,
                type: typesArray[index] // Assign the resolved types array
            }));
        })
    );
  }

  getPokemonTypes(url: string): Observable<string[]> {
      return this.http.get<any>(url).pipe(
          map((response: any) => {
              return response.types.map((type: any) => type.type.name);
          })
      );
  }
}
