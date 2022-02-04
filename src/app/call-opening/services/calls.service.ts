import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReturnHttp } from 'src/app/models/returnHttp';
import { BaseServiceService } from 'src/app/services/base-service.service';
import FilesUpload from 'src/app/shared/upload-files/models/files-upload';
import { QueryString } from 'src/app/util/query-string';
import CallCategoryOpeningResponse from '../call-opening-form/models/callCategoryOpeningResponse';
import CallOpening from '../call-opening-form/models/callOpening';
import CallsOpeningPreferencesRequest from '../call-opening-form/models/calls-opening-preferences-request';
import  CallsOpeningPreferencesResponse  from '../call-opening-form/models/calls-opening-preferences-response';
import CallsOpeningResponse from '../call-opening-form/models/callsOpeningResponse';

@Injectable({
  providedIn: 'root'
})
export class CallsService extends BaseServiceService {


  protected getController(): string {
    return 'calls';
  }

  constructor(public router: Router, public toastr: ToastrService,private http: HttpClient) {

      super(router,toastr);
   }

   public callsOpeningSendFiles(filesUpload:FilesUpload[],callOpening:CallOpening):Observable<ReturnHttp<CallsOpeningResponse>>
   {

      const formData = new FormData();
      filesUpload.forEach((f) => formData.append('files', f.file ?? '' ));
      formData.append('callOpeningRequest',  JSON.stringify(callOpening));
      return this.http.post<ReturnHttp<CallsOpeningResponse>>(`${this.getUrl()}/CallsOpeningSendFiles`,formData)
      ;
   }


   /**/


   public callOpeningPreferences(callOpening:CallsOpeningPreferencesRequest):Observable<ReturnHttp<CallsOpeningPreferencesResponse>>
   {
      return this.http.get<ReturnHttp<CallsOpeningPreferencesResponse>>(`${this.getUrl()}/CallOpeningPreferences?${QueryString.toString(callOpening)}`,super.GetHeaderJson())
      ;
   }

   public callsOpening(callOpening:CallOpening):Observable<ReturnHttp<CallsOpeningResponse>>
   {
      return this.http.post<ReturnHttp<CallsOpeningResponse>>(`${this.getUrl()}/CallsOpening`,callOpening,super.GetHeaderJson())
      ;
   }



}
