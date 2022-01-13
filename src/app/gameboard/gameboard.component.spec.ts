import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from "@ngx-translate/core";
import { SettingsService } from "../common/settings.service";
import { GameboardComponent } from "./gameboard.component";
import { GameboardController } from "./utils";

describe("GameboardComponent", () => {
  let component: GameboardComponent;
  let fixture: ComponentFixture<GameboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameboardComponent],
      providers: [
        {
          provide: SettingsService,
          useValue: {
            settings: { fileSettings: { inventoryActive: false } },
            ngOnInit: () => {},
          },
        },
        {
          provide: GameboardController,
          useValue: {},
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
    fixture = TestBed.createComponent(GameboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
