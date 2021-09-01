import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorController } from '../common/editor.controller';
import { EditorComponent } from './editor.component';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorComponent],
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
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
