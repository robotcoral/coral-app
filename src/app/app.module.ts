import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { CommonModule } from './common/common.module';
import { EditorComponent } from './editor/editor.component';
import { GameboardModule } from './gameboard/gameboard.module';
import { TitlebarComponent } from './titlebar/titlebar.component';

@NgModule({
  declarations: [AppComponent, EditorComponent, TitlebarComponent],
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
  ],
  providers: [{ provide: Window, useValue: window }],
  bootstrap: [AppComponent],
})
export class AppModule {}
