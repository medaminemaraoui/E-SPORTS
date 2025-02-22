import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ClubsService} from '../services/clubs.service';
import {Club, Reserv} from '../model/terrains.model';

@Component({
  selector: 'app-club-details',
  standalone: false,

  templateUrl: './club-details.component.html',
  styleUrl: './club-details.component.css'
})
export class ClubDetailsComponent implements OnInit {


  terrains: any;
  id!: number;


  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              public authService: AuthService,
              private clubsService: ClubsService) {
    this.id=route.snapshot.params['id'];
  }

  ngOnInit() {

    this.http.get(`http://localhost:8091/clubs/${this.id}/terrains`).subscribe({
      next: data => {
        this.terrains = data;

      },
      error: err => {
        console.log(err);
      }
    })
  }

  getReserv(t: any) {
    this.router.navigateByUrl("/admin/new-reserv/"+ t.id);
  }

  newTerrain() {
    this.router.navigateByUrl(`/admin/new-terrain/${this.id}`);

  }



  getClassByType(type: string): string {
    switch (type.toLowerCase()) {
      case 'football':
        return 'bg-football'; // Green for football (grass-like color)
      case 'tennis':
        return 'bg-tennis'; // Bright yellow for tennis (court-like color)
      case 'basketball':
        return 'bg-basketball'; // Orange for basketball (vibrant and energetic)
      case 'volleyball':
        return 'bg-volleyball'; // Light blue for volleyball (calm and beach-like)
      default:
        return 'bg-default'; // Neutral gray for other types
    }
  }



}
