import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CallCategoriesRoutingModule } from './callcategories-routing.module';
import { CallCategoriesAppComponent } from './callcategories.app.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ListComponent,
    CallCategoriesAppComponent
  ],
  imports: [
    CommonModule ,
    CallCategoriesRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,



  ]
})
export class CallcategoriesModule { }
