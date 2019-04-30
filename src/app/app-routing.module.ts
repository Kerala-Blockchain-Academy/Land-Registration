import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {MyPropertiesComponent} from './my-properties/my-properties.component';
import {SearchPropertiesComponent} from './search-properties/search-properties.component'

const routes: Routes = [{ path: 'admin', component: AdminComponent },
{ path: '', component: MyPropertiesComponent },
{ path: 'search', component: SearchPropertiesComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
