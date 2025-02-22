import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TerrainStatus, TerrainType} from '../model/terrains.model';
import {ClubsService} from '../services/clubs.service';

@Component({
  selector: 'app-new-terrain',
  standalone: false,

  templateUrl: './new-terrain.component.html',
  styleUrl: './new-terrain.component.css'
})
export class NewTerrainComponent implements OnInit {
  terrainFormGroup!: FormGroup;
  clubId! : string;
  terrainTypes : string[]=[];
  terrainStatus : string[]=[];
  showProgress : boolean = false;



  constructor(private fb:FormBuilder,
              private activatedRoute : ActivatedRoute,
              private clubsService : ClubsService,
              private router: Router ) {}

  ngOnInit() {
    for (let elt in TerrainType){
      let value = TerrainType[elt];
      if (typeof value === 'string'){
        this.terrainTypes.push(value);
      }
    }

    for (let elt in TerrainStatus){
      let value = TerrainStatus[elt];
      if (typeof value === 'string'){
        this.terrainStatus.push(value);
      }
    }

    this.clubId = this.activatedRoute.snapshot.params['code']

    this.terrainFormGroup=this.fb.group({
      clubId : this.fb.control(this.clubId),
      name : this.fb.control(''),
      type : this.fb.control(''),
      status : this.fb.control(''),
      nbPersons : this.fb.control(''),

    });
  }

  saveTerrain() {
    this.showProgress=true;
    let formData = new FormData();
    formData.set('clubId',this.terrainFormGroup.value.clubId);
    formData.set('name',this.terrainFormGroup.value.name);
    formData.set('type',this.terrainFormGroup.value.type);
    formData.set('status',this.terrainFormGroup.value.status);
    formData.set('nbPersons',this.terrainFormGroup.value.nbPersons);

    this.clubsService.saveTerrain(formData).subscribe({
      next : value => {
        this.showProgress=false;
        alert('Terrain Saved successfully!');

        this.router.navigate(['admin/terrains']);
      },
      error : err => {
        console.log(err);
        this.showProgress = false;
        alert('An error occurred while saving the terrain.');
      },
      }
    );

  }
}
