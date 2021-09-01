import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { EditorController } from '../common/editor.controller';
import { UtilService } from '../common/util.service';
import { GameboardController } from '../gameboard/utils';
import { TitlebarComponent } from './titlebar.component';

describe('TitlebarComponent', () => {
  let component: TitlebarComponent;
  let fixture: ComponentFixture<TitlebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TitlebarComponent],
      providers: [
        {
          provide: UtilService,
          useValue: {
            openModal: () => {},
          },
        },
        {
          provide: EditorController,
          useValue: {},
        },
        {
          provide: GameboardController,
          useValue: {
            openModal: () => {},
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
    fixture = TestBed.createComponent(TitlebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
