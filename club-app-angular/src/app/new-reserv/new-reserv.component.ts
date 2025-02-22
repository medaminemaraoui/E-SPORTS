import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ClubsService} from '../services/clubs.service';

@Component({
  selector: 'app-new-reserv',
  standalone: false,

  templateUrl: './new-reserv.component.html',
  styleUrl: './new-reserv.component.css'
})
export class NewReservComponent implements OnInit {

  reservs: any;
  id!: number;

  constructor(private http: HttpClient,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public authService: AuthService,
              private clubsService: ClubsService) {
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];  // Make sure id is assigned
    console.log("Received terrain ID:", this.id);  // Debugging log

    this.http.get(`http://localhost:8092/reservByTerrain/${this.id}/reservations`).subscribe({
      next: data => {
        console.log("Received reservations:", data); // Debugging log
        this.reservs = data;
      },
      error: err => {
        console.log("Error fetching reservations:", err);
      }
    });
  }


}
