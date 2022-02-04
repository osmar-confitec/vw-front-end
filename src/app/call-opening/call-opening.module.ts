import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallOpeningFormComponent } from './call-opening-form/call-opening-form.component';
import { CallOpeningAppComponent } from './call-opening.app.component';
import { CallOpeningRoutingModule } from './call-opening-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { TreeViewCategoriesComponent } from './tree-view-categories/tree-view-categories.component';
import { TreeviewModule } from 'ngx-treeview';
import { CallsService } from './services/calls.service';
import { CallsCategoryService } from './services/calls-category.service';
import { UsersListComponent } from './users-list/users-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CallOpeningFormComponent,
    CallOpeningAppComponent,
    TreeViewCategoriesComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    CallOpeningRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    TreeviewModule.forRoot(),
    SharedModule
  ],
  providers:[CallsService,CallsCategoryService]
})
export class CallOpeningModule { }
