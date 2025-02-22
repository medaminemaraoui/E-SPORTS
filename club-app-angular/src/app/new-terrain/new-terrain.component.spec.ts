import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTerrainComponent } from './new-terrain.component';

describe('NewTerrainComponent', () => {
  let component: NewTerrainComponent;
  let fixture: ComponentFixture<NewTerrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewTerrainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
