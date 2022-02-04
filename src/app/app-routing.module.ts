import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccessDeniedComponent } from "./components/access-denied/access-denied.component";
import { HomeComponent } from "./components/home/home.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";

const routes:Routes = [
    {path:'', redirectTo:'/home', pathMatch:'full'},
    {path:'home', component:HomeComponent },
    {path:'desbloquear',
      loadChildren:()=>import('./unblock-network-user/unblock-network-user.module')
      .then(m=>m.UnblockNetworkUserModule)
    },
    {path:'categorias-chamado',
    loadChildren:()=>import('./callcategories/callcategories.module')
    .then(m=>m.CallcategoriesModule)
    },
    {path:'evidencia',
      loadChildren:()=>import('./send-evidence/send-evidence.module')
      .then(m=>m.SendEvidenceModule)
    },
    {path:'chamados',
      loadChildren:()=>import('./call-opening/call-opening.module')
      .then(m=>m.CallOpeningModule)
    },


    {path:'acesso-negado', component:AccessDeniedComponent},
    {path:'nao-encontrado', component:NotFoundComponent},
    {path:'**', component:NotFoundComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
