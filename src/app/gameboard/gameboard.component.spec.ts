import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { GameboardComponent } from './gameboard.component';

class MockToastrService {
  error(
    message?: string,
    title?: string,
    override?: Partial<IndividualConfig>
  ) {}
}

describe('GameboardComponent', () => {
  let component: GameboardComponent;
  let fixture: ComponentFixture<GameboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameboardComponent],
      providers: [
        {
          provide: ToastrService,
          useClass: MockToastrService,
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
