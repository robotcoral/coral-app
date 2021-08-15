import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CodeMirrorModule } from '@robotcoral/ngx-codemirror6';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { GameboardComponent } from './gameboard/gameboard.component';

@NgModule({
  declarations: [AppComponent, EditorComponent, GameboardComponent],
  imports: [BrowserModule, FormsModule, CodeMirrorModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
