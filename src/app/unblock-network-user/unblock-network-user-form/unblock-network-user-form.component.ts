import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import UserUnblock from '../models/user-unblock';
import { UserUnblockService } from '../services/user-unblock.service';

@Component({
  selector: 'app-unblock-network-user-form',
  templateUrl: './unblock-network-user-form.component.html',
  styleUrls: ['./unblock-network-user-form.component.css']
})
export class UnblockNetworkUserFormComponent implements OnInit {

  constructor(private userUnblockService:UserUnblockService,  private toastr: ToastrService) {

    this.unblockForm = new FormGroup({
      userId: new FormControl(this.userUnblock.userId, [Validators.required]),
    });

  }

  showMessageAlert(message: string) {
    this.toastr.warning(message, '', { "positionClass": "toast-bottom-right" });
  }

  showMessageError(message: string) {
    this.toastr.error(message, '', { "positionClass": "toast-bottom-right" });
  }

  showMessageSuccess(message: string) {
    this.toastr.success(message, '', { "positionClass": "toast-bottom-right" });
  }


  unblockForm: FormGroup;
  userUnblock: UserUnblock = new UserUnblock();
  formSubmeted: boolean = false;

  fieldIsValid(field: any): boolean {
    return (this.formSubmeted && field?.invalid) || (field?.invalid && (field?.dirty || field?.touched))
  }
  sendUnblock(): void {
    this.formSubmeted = true;
    if (this.unblockForm.valid && this.unblockForm.dirty)
    {
      this.userUnblock = Object.assign({}, this.userUnblock, this.unblockForm.value);
      this.userUnblockService.usersUnblock(this.userUnblock).subscribe((subs)=>{
        this.resetForm();
        this.showMessageSuccess('Colaborador Desbloqueado com Sucesso!');
      },err=>{
          this.userUnblockService.serviceError(err)
        })
    }
  }

  resetForm() {
    this.unblockForm.reset();
    this.formSubmeted = false;
    this.userUnblock = new UserUnblock();
    this.unblockForm.patchValue({
      userId: this.userUnblock.userId
    });
  }

  get userId() { return this.unblockForm.get('userId') }

  ngOnInit(): void {
  }

}
