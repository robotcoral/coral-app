import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorController } from 'src/app/common/editor.controller';
import { KarolInterpreter } from 'src/app/common/karol.interpreter';
import { EditorViewComponent } from './editor-view.component';

describe('EditorViewComponent', () => {
  let component: EditorViewComponent;
  let fixture: ComponentFixture<EditorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorViewComponent],
      providers: [
        {
          provide: Window,
          useValue: {
            getComputedStyle: () => {
              return { 'font-size': 16 };
            },
          },
        },
        {
          provide: EditorController,
          useValue: { setEditor: () => {} },
        },
        { provide: Document, useValue: {} },
        { provide: KarolInterpreter, useValue: { setEditor: () => {} } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
