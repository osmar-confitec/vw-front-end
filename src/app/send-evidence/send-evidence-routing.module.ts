import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SendEvidenceFormComponent } from "./send-evidence-form/send-evidence-form.component";
import { SendEvidenceAppComponent } from "./send-evidence.app.component";



const router:Routes=[

  {path:'',
   component:SendEvidenceAppComponent,
    children:[
      {path:'enviar-evidencia', component:SendEvidenceFormComponent}
    ]
  }

]
@NgModule({
  imports: [
      RouterModule.forChild(router)
  ],
  exports: [RouterModule]
})
export class SendEvidenceRoutingModule { }
