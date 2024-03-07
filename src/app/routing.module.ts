import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { PokemonDetailComponent } from "./components/pokemon-detail/pokemon-detail.component";
import { HistoryComponent } from "./pages/history/history.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { MyMapComponent } from "./pages/my-map/my-map.component";

export const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: "full"},
    { path: 'login', component: LoginPageComponent },
    { path: 'MyMap', component: MyMapComponent },
    { path: 'home', component: HomeComponent },
    { path: 'details/:id', component: PokemonDetailComponent },
    { path: 'history', component: HistoryComponent },
    { path: '**', redirectTo: '/login', pathMatch: "full" }
  ];