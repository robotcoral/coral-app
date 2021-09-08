import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { CommonModule } from './common/common.module';
import { EditorModule } from './editor/editor.module';
import { GameboardModule } from './gameboard/gameboard.module';
import { TitlebarComponent } from './titlebar/titlebar.component';

export function HTTPLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent, TitlebarComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    GameboardModule,
    CommonModule,
    ToastrModule.forRoot(),
    NgbModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HTTPLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
    EditorModule,
  ],
  providers: [{ provide: Window, useValue: window }],
  bootstrap: [AppComponent],
})
export class AppModule {}
