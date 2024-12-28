import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from "./components/games/games.component";
import { ToolsComponent } from "./components/tools/tools.component";
import { SitesComponent } from "./components/sites/sites.component";
import { ContactComponent } from "./components/contact/contact.component";
import { HomeComponent } from './components/home/home.component';
import { TamagotchiComponent } from './components/tamagotchi/tamagotchi.component';
import { WeatherComponent } from './components/weather/weather.component';
import { RoyalRideComponent } from './components/royal-ride/royal-ride.component';
import { DevToolsComponent } from './components/dev-tools/dev-tools.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games', component: GamesComponent },
  { path: 'games/tamagotchi', component: TamagotchiComponent },
  { path: 'tools', component: ToolsComponent },
  { path: 'tools/weather', component: WeatherComponent },
  { path: 'tools/dev-tools', component: DevToolsComponent },
  { path: 'sites', component: SitesComponent },
  { path: 'sites/royalride', component: RoyalRideComponent },
  { path: 'contact', component: ContactComponent },
];
