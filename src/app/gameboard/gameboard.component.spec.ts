import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsService } from '../common/settings.service';
import { GameboardComponent } from './gameboard.component';
import { GameboardController } from './utils';

describe('GameboardComponent', () => {
  let component: GameboardComponent;
  let fixture: ComponentFixture<GameboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameboardComponent],
      providers: [
        {
          provide: SettingsService,
          useValue: { settings: { inventoryActive: false } },
        },
        {
          provide: GameboardController,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
