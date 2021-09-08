import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { KarolInterpreter } from 'src/app/common/karol.interpreter';
import { EditorControlsComponent } from './editor-controls.component';

describe('EditorControlsComponent', () => {
  let component: EditorControlsComponent;
  let fixture: ComponentFixture<EditorControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorControlsComponent],
      providers: [
        {
          provide: KarolInterpreter,
          useValue: { running: new Observable() },
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
    fixture = TestBed.createComponent(EditorControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
