import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { PokemonDetailComponent } from "./components/pokemon-detail/pokemon-detail.component";
import { HistoryComponent } from "./pages/history/history.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";

export const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: "full"},
    { path: 'login', component: LoginPageComponent },
    { path: 'home', component: HomeComponent },
    { path: 'details/:id', component: PokemonDetailComponent },
    { path: 'history', component: HistoryComponent }
  ];