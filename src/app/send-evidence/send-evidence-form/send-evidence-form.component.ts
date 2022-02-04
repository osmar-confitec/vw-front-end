import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import FilesUpload from 'src/app/shared/upload-files/models/files-upload';
import { UploadFilesComponent } from 'src/app/shared/upload-files/upload-files.component';
import { environment } from 'src/environments/environment';
import SendEvidence from '../models/send-evidence';
import { SendEvidenceService } from '../services/send-evidence.service';

@Component({
  selector: 'app-send-evidence-form',
  templateUrl: './send-evidence-form.component.html',
  styleUrls: ['./send-evidence-form.component.css']
})
export class SendEvidenceFormComponent implements OnInit, AfterViewInit {

  public Invalidsextensions:Array<string> = ['.bat','.chm','.cmd','.com','.exe','.hlp','.cpl','.crt','.hta','.inf','.ins','.isp','.jar','.java','.jse','.lnk','.mdb','.ms','.msi','.pcd','.pif','.ps1','.m3u','.m3u8','.reg','.src','.sct','.shs','.vb','.vbe','.vbs','.ws'];

  @ViewChild('upload') uploadFiles                                        : UploadFilesComponent | undefined;
  sendEvidenceForm:FormGroup;
  sendEvidence:SendEvidence = new SendEvidence();
  filesUpload:FilesUpload[] = [];
  formSubmeted:boolean = false;
  limitUpload:number = environment.limitUpload;
  limitUploadDescription:string = '';

  showMessageAlert(message:string)
  {
    this.toastr.warning(message,'',{"positionClass": "toast-bottom-right"});
  }

  showMessageError(message:string)
  {
    this.toastr.error(message,'',{"positionClass": "toast-bottom-right"});
  }

  showMessageSuccess(message:string)
  {
    this.toastr.success(message,'',{"positionClass": "toast-bottom-right"});
  }

  constructor(private toastr: ToastrService,private sendEvidenceService:SendEvidenceService) {
    this.sendEvidenceForm = new FormGroup({
      requestNumber: new FormControl(this.sendEvidence.requestNumber, [Validators.required]),
      infoAditional:new FormControl(this.sendEvidence.infoAditional)
    });
   }
  ngAfterViewInit(): void {
    if (this.uploadFiles)
    this.limitUploadDescription = this.uploadFiles.getDisplaylimitLength();
  }

  resetForm()
  {
    this.sendEvidenceForm.reset();
    this.sendEvidence = new SendEvidence();
    this.formSubmeted = false;
    this.sendEvidenceForm.patchValue({
      requestNumber:this.sendEvidence.requestNumber,
    });
  }
  sendUnblock()
  {
    this.formSubmeted = true;
    if (this.sendEvidenceForm.valid && this.sendEvidenceForm.dirty)
    {

      if(this.uploadFiles?.isLimitExceededAllFiles())
      {
          this.showMessageAlert(` Atenção tamanho dos arquivos ultrapassa os limites que é de ${this.uploadFiles.getDisplaylimitLength()} `);
          return;
      }

      if (this.filesUpload.length<=0)
    {

      this.showMessageAlert(` Atenção é necessário anexar arquivos para enviar as evidências `);
      return;
    }

      this.sendEvidence = Object.assign({}, this.sendEvidence, this.sendEvidenceForm.value);
      this.sendEvidenceService.sendEvidences(this.filesUpload,this.sendEvidence).subscribe((subs)=>{
        this.resetForm();
        this.uploadFiles?.clearUploadFiles();
        this.showMessageSuccess('Evidencia Enviada com Sucesso.!');
      },err=>{
        this.sendEvidenceService.serviceError(err)
      })
    }
  }
  uploadedFiles(filesUpload:FilesUpload[])
  {
    this.filesUpload = filesUpload;
  }

  fieldIsValid(field:any):boolean
  {
    return (this.formSubmeted &&  field?.invalid) || (field?.invalid && (field?.dirty || field?.touched))
  }

  get requestNumber(){ return this.sendEvidenceForm.get('requestNumber') }

  ngOnInit(): void {

  }

}
