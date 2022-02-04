import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgZone } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable,  throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract  class BaseServiceService {

  protected url: string = environment.api;

  protected controller:string = '';

  protected abstract getController():string;

  protected showMessageError(message:string)
  {
    this.toastr.error(message,'',{"positionClass": "toast-bottom-right",onActivateTick: true});
  }

  protected getUrl():string
  {
        return   this.url+this.controller;
  }

  protected GetHeaderJson() {
    return {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
}



public serviceError(response: any  )
{

  if (response.status === 401)
  {
    this.router.navigate(['/acesso-negado']);

  }
  else
  {
    let showErrors:string = '';
    for (let index = 0; index < response.error.errors.length; index++) {
      const element = response.error.errors[index];
      showErrors += element.message + '\n';

    }
    this.toastr.error(showErrors,'',{"positionClass": "toast-bottom-right"});
  }
}

  constructor(protected router: Router, protected toastr: ToastrService) {
      this.controller = this.getController();
   }
}
