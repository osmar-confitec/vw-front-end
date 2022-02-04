import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ReturnHttp } from 'src/app/models/returnHttp';
import { BaseServiceService } from 'src/app/services/base-service.service';
import FilesUpload from 'src/app/shared/upload-files/models/files-upload';
import SendEvidence from '../models/send-evidence';
import SendEvidencesResponse from '../models/send-evidences-response';

@Injectable({
  providedIn: 'root'
})
export class SendEvidenceService extends BaseServiceService {


  protected getController(): string {
    return 'Evidence';
  }

  constructor(public router: Router, public toastr: ToastrService,private http: HttpClient) {super(router,toastr); }

  public sendEvidences(filesUpload:FilesUpload[],sendEvidence:SendEvidence):Observable<ReturnHttp<SendEvidencesResponse>>
  {
     const formData = new FormData();
     filesUpload.forEach((f) => formData.append('files', f.file ?? '' ));
     formData.append('sendEvidencesRequests',  JSON.stringify(sendEvidence));
     return this.http.post<ReturnHttp<SendEvidencesResponse>>(`${this.getUrl()}/SendEvidences`,formData)
     ;
  }

}
