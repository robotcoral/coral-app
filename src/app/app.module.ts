import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CodeMirrorModule } from '@robotcoral/ngx-codemirror6';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { GameboardControlsComponent } from './gameboard/gameboard-controls/gameboard-controls.component';
import { GameboardViewComponent } from './gameboard/gameboard-view/gameboard-view.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { TitlebarComponent } from './titlebar/titlebar.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    GameboardComponent,
    GameboardControlsComponent,
    GameboardViewComponent,
    TitlebarComponent,
  ],
  imports: [BrowserModule, FormsModule, CodeMirrorModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
