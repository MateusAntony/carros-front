import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcasslistComponent } from './marcasslist.component';

describe('MarcasslistComponent', () => {
  let component: MarcasslistComponent;
  let fixture: ComponentFixture<MarcasslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcasslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcasslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
