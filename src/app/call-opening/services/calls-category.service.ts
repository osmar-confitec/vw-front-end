import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ReturnHttp } from 'src/app/models/returnHttp';
import { BaseServiceService } from 'src/app/services/base-service.service';
import CallCategoriesChildrenNodesRequest from '../call-opening-form/models/callCategoriesChildrenNodesRequest';
import CallCategoryOpeningResponse from '../call-opening-form/models/callCategoryOpeningResponse';

@Injectable({
  providedIn: 'root'
})
export class CallsCategoryService extends BaseServiceService {


  protected getController(): string {
   return 'callsCategory';
  }

  getCallCategoriesFromText(text:string):Observable<ReturnHttp<CallCategoryOpeningResponse>>
  {

    return this.http.get<ReturnHttp<CallCategoryOpeningResponse>>(`${this.getUrl()}/CallCategoriesFromText?txtSearch=${text}`,super.GetHeaderJson())

  }

  getCallCategoriesChildrenNodes(categories:CallCategoriesChildrenNodesRequest):Observable<ReturnHttp<CallCategoryOpeningResponse>>
  {

    return this.http.post<ReturnHttp<CallCategoryOpeningResponse>>(`${this.getUrl()}/CallCategoriesChildrenNodes`,categories,super.GetHeaderJson())

  }

  getCallsCategoriesExcel():Observable<ReturnHttp<CallCategoryOpeningResponse>>
   {
      return this.http.get<ReturnHttp<CallCategoryOpeningResponse>>(`${this.getUrl()}/CallsCategoriesExcel`,super.GetHeaderJson())
   }

  getCallCategoriesParentsResponse():Observable<ReturnHttp<CallCategoryOpeningResponse>>
  {
     return this.http.get<ReturnHttp<CallCategoryOpeningResponse>>(`${this.getUrl()}/CallCategoriesParents`,super.GetHeaderJson())
  }

  constructor(public router: Router, public toastr: ToastrService,private http: HttpClient) {super(router,toastr); }
}
