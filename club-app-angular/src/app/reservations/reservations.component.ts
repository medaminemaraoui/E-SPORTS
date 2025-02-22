import {Component, OnInit} from '@angular/core';
import {ClubsService} from '../services/clubs.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Club, Reserv} from '../model/terrains.model';

@Component({
  selector: 'app-reservations',
  standalone: false,

  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent implements OnInit{
  reservs!: Array<Reserv>;

  constructor(private clubsService: ClubsService
    ,private router: Router,
              public authService: AuthService) {
  }

  ngOnInit() {
    this.clubsService.getReserv()
      .subscribe({
        next: data => {
          this.reservs = data;

        },
        error: err => {
          console.log(err);
        }
      })
  }

}
