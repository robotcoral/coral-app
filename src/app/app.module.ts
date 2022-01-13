import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AngularSvgIconModule } from "angular-svg-icon";
import { defaultSimpleModalOptions, SimpleModalModule } from "ngx-simple-modal";
import { ToastrModule } from "ngx-toastr";
import { AppComponent } from "./app.component";
import { CommonModule } from "./common/common.module";
import { EditorModule } from "./editor/editor.module";
import { GameboardModule } from "./gameboard/gameboard.module";
import { ModalsModule } from "./modals/modals.module";
import { SettingsModule } from "./settings/settings.module";
import { TabsModule } from "./tabs/tabs.module";
import { TitlebarModule } from "./titlebar/titlebar.module";

export function HTTPLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const externalModules = [
  AngularSvgIconModule.forRoot(),
  BrowserAnimationsModule,
  BrowserModule,
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule,
  SimpleModalModule.forRoot(
    { container: "modal-container" },
    { ...defaultSimpleModalOptions, ...{ closeOnClickOutside: true } }
  ),
  ToastrModule.forRoot(),
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HTTPLoaderFactory,
      deps: [HttpClient],
    },
    defaultLanguage: "en",
  }),
];

const internalModules = [
  CommonModule,
  EditorModule,
  GameboardModule,
  ModalsModule,
  SettingsModule,
  TabsModule,
  TitlebarModule,
];

@NgModule({
  declarations: [AppComponent],
  imports: [...externalModules, ...internalModules],
  providers: [{ provide: Window, useValue: window }],
  bootstrap: [AppComponent],
})
export class AppModule {}
