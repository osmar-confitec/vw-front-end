import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UnblockNetworkUserFormComponent } from "./unblock-network-user-form/unblock-network-user-form.component";
import { UnblockNetWorkUserAppComponent } from "./unblock-network-user.app.component";



const router:Routes=[

  {path:'',
   component:UnblockNetWorkUserAppComponent,
    children:[
      {path:'desbloquear-usuario', component:UnblockNetworkUserFormComponent}
    ]
  }

]
@NgModule({
  imports: [
      RouterModule.forChild(router)
  ],
  exports: [RouterModule]
})
export class UnblockNetWorkUserRoutingModule { }
