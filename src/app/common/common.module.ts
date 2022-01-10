import { CommonModule as AngularCommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { KarolInterpreter } from "./karol.interpreter";

@NgModule({
  providers: [KarolInterpreter],
  imports: [
    AngularCommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
  ],
})
export class CommonModule {}
