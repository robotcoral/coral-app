import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsService } from 'src/app/common/settings.service';
import { GameboardController } from '../utils';
import { GameboardViewComponent } from './gameboard-view.component';

describe('GameboardViewComponent', () => {
  let component: GameboardViewComponent;
  let fixture: ComponentFixture<GameboardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameboardViewComponent],
      providers: [
        {
          provide: GameboardController,
          useValue: {
            getRobot: () => {
              return {
                mesh: {},
              };
            },
            getWorld: () => {},
          },
        },
        {
          provide: SettingsService,
          useValue: {
            onThemeChange: {
              subscribe: () => {},
            },
          },
        },
        {
          provide: Document,
          useValue: {
            body: {},
          },
        },
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
