import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeMirrorModule } from '@robotcoral/ngx-codemirror6';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { GameboardModule } from './gameboard/gameboard.module';
import { TitlebarComponent } from './titlebar/titlebar.component';

@NgModule({
  declarations: [AppComponent, EditorComponent, TitlebarComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    CodeMirrorModule,
    GameboardModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
