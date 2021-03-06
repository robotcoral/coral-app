import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { SettingsService } from 'src/app/common/settings.service';
import { UtilService } from 'src/app/common/util.service';
import { GameboardController } from '../utils';
import { GameboardControlsComponent } from './gameboard-controls.component';

describe('GameboardControlsComponent', () => {
  let component: GameboardControlsComponent;
  let fixture: ComponentFixture<GameboardControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameboardControlsComponent],
      providers: [
        { provide: Document, useValue: {} },
        {
          provide: GameboardController,
          useValue: {},
        },
        {
          provide: UtilService,
          useValue: {
            openModal: () => {},
          },
        },
        {
          provide: SettingsService,
          useValue: {
            onThemeChange: {
              subscribe: () => {},
            },
            gameboardTheme: {},
          },
        },
      ],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
    }).compileComponents();
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
