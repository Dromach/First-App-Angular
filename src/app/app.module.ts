import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [
      DialogComponent
    ],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MatDialogModule
    ],
    providers: [],
    bootstrap: [DialogComponent]
  })
export class AppModule {
  ngDoBootstrap() {
    platformBrowserDynamic().bootstrapModule(AppModule);
  }
}