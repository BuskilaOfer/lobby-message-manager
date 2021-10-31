import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { Ng2LoadingSpinnerModule } from "ng2-loading-spinner";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    Ng2LoadingSpinnerModule.forRoot({ spinnerColor: 'black', spinnerSize: 'md', backdropColor: 'transparent' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
