import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClubsComponent} from './clubs/clubs.component';
import {HomeComponent} from './home/home.component';
import {TerrainsComponent} from './terrains/terrains.component';
import {ClubDetailsComponent} from './club-details/club-details.component';
import {NewReservComponent} from './new-reserv/new-reserv.component';
import {NewTerrainComponent} from './new-terrain/new-terrain.component';
import {NavComponent} from './nav/nav.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {AuthorizationGuard} from './guards/AuthorizationGuard.guard';
import {ReservationsComponent} from './reservations/reservations.component';
import {ProfileComponent} from './profile/profile.component';
import {CalendarComponent} from './calendar/calendar.component';
import {UserTerrainsComponent} from './user-terrains/user-terrains.component';
const routes: Routes = [

  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  {
    path: "admin", component: NavComponent,
    canActivate:[AuthGuard],
    children: [
      { path: "home", component: HomeComponent
        , canActivate : [AuthorizationGuard], data:{roles:['USER']}
      },
      { path: "clubs", component: ClubsComponent },
      { path: "terrains", component: TerrainsComponent },
      {path: "user-terrains", component: UserTerrainsComponent},
      { path: "club-details/:id", component: ClubDetailsComponent },
      { path: "new-terrain", component: NewTerrainComponent},

      { path: "new-terrain/:code", component: NewTerrainComponent
        , canActivate : [AuthorizationGuard], data:{roles:['ADMIN']}
      },

      { path: "calendar", component: CalendarComponent },

      { path: "profile", component: ProfileComponent },


      { path: "reservations", component: ReservationsComponent },

      { path: "new-reserv", component: NewReservComponent },
      { path: "new-reserv/:id", component: NewReservComponent },



    ],
  },
  { path: "**", redirectTo: "" }, // Redirect unknown paths to the login page





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
