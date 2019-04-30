import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { MyPropertiesComponent } from './my-properties/my-properties.component';
import { SearchPropertiesComponent } from './search-properties/search-properties.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    MyPropertiesComponent,
    SearchPropertiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
