import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ReturnHttp } from 'src/app/models/returnHttp';
import { BaseServiceService } from 'src/app/services/base-service.service';
import UserUnblock from '../models/user-unblock';
import { UserUnblockResponse } from '../models/user-unblock-response';

@Injectable({
  providedIn: 'root'
})
export class UserUnblockService extends BaseServiceService {


  protected getController(): string {
    return 'users'
  }

  public usersUnblock(userUnblock:UserUnblock):Observable<ReturnHttp<UserUnblockResponse>>
  {
     return this.http.post<ReturnHttp<UserUnblockResponse>>(`${this.getUrl()}/UsersUnblock`,userUnblock,super.GetHeaderJson())
     ;
  }

  constructor(public router: Router,
              public toastr: ToastrService,
              private http: HttpClient) {

    super(router,toastr);
 }

}
