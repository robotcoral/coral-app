import { ComponentFixture, TestBed } from '@angular/core/testing';
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
          provide: GameboardController,
          useValue: {
            openModal: () => {},
          },
        },
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
