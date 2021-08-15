import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameboardControlsComponent } from './gameboard-controls.component';

describe('GameboardControlsComponent', () => {
  let component: GameboardControlsComponent;
  let fixture: ComponentFixture<GameboardControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameboardControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameboardControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
