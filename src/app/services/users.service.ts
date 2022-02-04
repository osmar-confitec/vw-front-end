import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ReturnHttp } from '../models/returnHttp';
import { Users } from '../models/users';
import { QueryString } from '../util/query-string';
import { BaseServiceService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseServiceService {
  protected getController(): string {
    return 'users'
  }

  constructor(private http: HttpClient,public router: Router, public toastr: ToastrService) { super(router,toastr)

  }

  getUsersLogged():Observable<ReturnHttp<Users>>
  {
     return this.http.get<ReturnHttp<Users>>(`${this.getUrl()}/UsersLogged`,super.GetHeaderJson())
  }

  getUsers(callOpening:Users):Observable<ReturnHttp<Array<Users>>>
  {
     return this.http.get<ReturnHttp<Array<Users>>>(`${this.getUrl()}/Users?${QueryString.toString(callOpening)}`,super.GetHeaderJson())
     ;
  }



}
