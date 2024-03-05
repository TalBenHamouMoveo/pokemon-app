import { Routes } from "@angular/router";
import { HomeComponent } from "../../pages/home/home.component";
import { PokemonDetailComponent } from "../pokemon-detail/pokemon-detail.component";

export const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: "full"},
    { path: 'home', component: HomeComponent },
    { path: 'details/:name', component: PokemonDetailComponent }
  ];