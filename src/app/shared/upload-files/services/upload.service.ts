import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ReturnHttp } from 'src/app/models/returnHttp';
import { BaseServiceService } from 'src/app/services/base-service.service';
import FilesUpload from '../models/files-upload';
import SendFilesToCallsResponse from '../models/send-files-to-calls-response';

@Injectable({
  providedIn: 'root'
})
export class UploadService extends BaseServiceService {


  protected getController(): string {
    return 'calls'
  }

   public sendFilesToCalls(filesUpload:FilesUpload[]):Observable<ReturnHttp<SendFilesToCallsResponse>>
  {

     const formData = new FormData();
     filesUpload.forEach((f) => formData.append('files', f.file ?? '' ));
     return this.http.post<ReturnHttp<SendFilesToCallsResponse>>(`${this.getUrl()}/SendFilesToCalls`,formData)
     ;
  }
  constructor(public router: Router, public toastr: ToastrService, private http: HttpClient) {
    super(router, toastr);
  }
}
