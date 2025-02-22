
import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClubsService } from '../services/clubs.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-user-terrains',
  standalone: false,
  
  templateUrl: './user-terrains.component.html',
  styleUrl: './user-terrains.component.css'
})
export class UserTerrainsComponent implements OnInit {
  terrains: any;
  dataSource!: MatTableDataSource<any>;
  updateForm: FormGroup;
  selectedItem: any = null;
  isUpdating: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private clubsService: ClubsService,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.updateForm = this.fb.group({
      name: [''],
      type: [''],
      status: [''],
      nbPersons: ['']
    });
  }

  ngOnInit() {
    this.clubsService.getAllTerrains().subscribe({
      next: data => {
        this.terrains = data;
        this.dataSource = new MatTableDataSource(this.terrains);
        this.dataSource.paginator = this.paginator;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onUpdate(element: any) {
    this.selectedItem = element;
    this.updateForm.patchValue(element);
    this.isUpdating = true;


    
  }



  //scroll method 
 
  

  onSubmit() {
    if (this.selectedItem) {
      this.http.put(`http://localhost:8091/terrains/${this.selectedItem.id}`, this.updateForm.value).subscribe({
        next: () => {
          this.snackBar.open('Terrain mis à jour avec succès', 'Fermer', { duration: 3000 });
          this.isUpdating = false;
          this.selectedItem = null;
          // Optionally, refresh the list
          this.clubsService.getAllTerrains().subscribe(data => {
            this.terrains = data;
            this.dataSource = new MatTableDataSource(this.terrains);
            this.dataSource.paginator = this.paginator;
          });
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour :', err);
          this.snackBar.open('Erreur lors de la mise à jour', 'Fermer', { duration: 3000 });
        }
      });
    }
  }

  onCancel() {
    this.isUpdating = false;
    this.selectedItem = null;
  }

  onDelete(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce terrain ?')) {
      this.http.delete(`http://localhost:8091/terrains/${id}`).subscribe({
        next: () => {
          this.terrains = this.terrains.filter((t: { id: number; }) => t.id !== id);
          this.snackBar.open('Terrain supprimé avec succès', 'Fermer', { duration: 3000 });
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
          this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 3000 });
        }
      });
    }
  }
}