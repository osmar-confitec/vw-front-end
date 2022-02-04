import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnblockNetWorkUserAppComponent } from './unblock-network-user.app.component';
import { UnblockNetworkUserFormComponent } from './unblock-network-user-form/unblock-network-user-form.component';
import { UnblockNetWorkUserRoutingModule } from './unblock-network-user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserUnblockService } from './services/user-unblock.service';



@NgModule({
  declarations: [UnblockNetWorkUserAppComponent, UnblockNetworkUserFormComponent],
  imports: [
    CommonModule,
    UnblockNetWorkUserRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers:[UserUnblockService]
})
export class UnblockNetworkUserModule { }
