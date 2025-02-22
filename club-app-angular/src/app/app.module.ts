import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClubsComponent } from './clubs/clubs.component';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { TerrainsComponent } from './terrains/terrains.component';
import { ClubDetailsComponent } from './club-details/club-details.component';
import { CustomersComponent } from './customers/customers.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatListModule} from '@angular/material/list';
import { NewReservComponent } from './new-reserv/new-reserv.component';
import { NewTerrainComponent } from './new-terrain/new-terrain.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {AuthorizationGuard} from './guards/AuthorizationGuard.guard';
import { ReservationsComponent } from './reservations/reservations.component';
import { ProfileComponent } from './profile/profile.component';
import { CalendarComponent } from './calendar/calendar.component';
import {CommonModule} from '@angular/common';
import {FullCalendarModule} from '@fullcalendar/angular';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserTerrainsComponent } from './user-terrains/user-terrains.component';

@NgModule({
  declarations: [
    AppComponent,
    ClubsComponent,
    HomeComponent,
    NavComponent,
    TerrainsComponent,
    ClubDetailsComponent,
    CustomersComponent,
    NewReservComponent,
    NewTerrainComponent,
    LoginComponent,
    ReservationsComponent,
    ProfileComponent,
    CalendarComponent,
    UserTerrainsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule, FullCalendarModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    NgbModule
  ],
  providers: [
    provideAnimationsAsync(),
    AuthGuard,
    AuthorizationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
