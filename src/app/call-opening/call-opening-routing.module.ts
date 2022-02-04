import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CallOpeningFormComponent } from "./call-opening-form/call-opening-form.component";
import { CallOpeningAppComponent } from "./call-opening.app.component";


const router:Routes=[

  {path:'',
   component:CallOpeningAppComponent,
    children:[
      {path:'abrir-chamado', component:CallOpeningFormComponent}
    ]
  }

]
@NgModule({
  imports: [
      RouterModule.forChild(router)
  ],
  exports: [RouterModule]
})
export class CallOpeningRoutingModule { }
