import { Component, OnInit } from '@angular/core';
import { PokemonService } from './shared/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  
  title = 'Pokemon';
}
