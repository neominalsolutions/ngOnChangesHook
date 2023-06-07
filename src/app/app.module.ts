import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestOnChangesComponent } from './test-on-changes/test-on-changes.component';
import { SaveButtonComponent } from './components/save-button/save-button.component';

@NgModule({
  declarations: [AppComponent, TestOnChangesComponent, SaveButtonComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
