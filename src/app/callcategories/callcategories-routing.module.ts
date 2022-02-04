import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CallCategoriesAppComponent } from "./callcategories.app.component";
import { ListComponent } from "./list/list.component";


const router:Routes=[

  {path:'',
   component:CallCategoriesAppComponent,
    children:[
      {path:'list-callcategories', component:ListComponent}
    ]
  }

]
@NgModule({
  imports: [
      RouterModule.forChild(router)
  ],
  exports: [RouterModule]
})
export class CallCategoriesRoutingModule { }
