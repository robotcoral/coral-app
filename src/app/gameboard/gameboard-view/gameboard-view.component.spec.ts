import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameboardViewComponent } from './gameboard-view.component';
import { Robot, World } from './utils';

describe('GameboardViewComponent', () => {
  let component: GameboardViewComponent;
  let fixture: ComponentFixture<GameboardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameboardViewComponent],
      providers: [
        { provide: World, useValue: { init: () => {} } },
        { provide: Robot, useValue: { init: () => {} } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameboardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
