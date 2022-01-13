import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EditorController } from "src/app/common/editor.controller";
import { KarolInterpreter } from "src/app/common/karol.interpreter";
import { SettingsService } from "src/app/common/settings.service";
import { EditorViewComponent } from "./editor-view.component";

describe("EditorViewComponent", () => {
  let component: EditorViewComponent;
  let fixture: ComponentFixture<EditorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorViewComponent],
      providers: [
        {
          provide: EditorController,
          useValue: { setEditor: () => {} },
        },
        {
          provide: SettingsService,
          useValue: {
            onEditorSettingsChange: { subscribe: () => {} },
            settings: {
              globalSettings: {
                tabWidth: 4,
              },
            },
          },
        },
        { provide: KarolInterpreter, useValue: { setEditor: () => {} } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
