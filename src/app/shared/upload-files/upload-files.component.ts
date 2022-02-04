import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmMessageComponent } from '../confirm-message/confirm-message.component';
import FilesUpload from './models/files-upload';
import { FilesUploadState } from './models/files-upload-state';
import { UploadService } from './services/upload.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  selectedFiles:Array<FilesUpload>= [];

  @ViewChild('modalConfirmDeleteFiles') modalConfirmDeleteFiles                                        : ConfirmMessageComponent | undefined;

  public quantityAllFiles:number = 0;
  public quantitySelectedFiles:number = 0;
  public quantitySendFiles:number = 0;

  @Input()  limitLength:number | undefined ;
  @Input()  Invalidsextensions:Array<string> = [];
  @Output() uploadedFiles = new EventEmitter<Array<FilesUpload>>();

  private indexFileDelete:number = 0;


  clearUploadFiles()
  {

    this.selectedFiles = [];
    this.updateQuantityFiles();
  }



  public getDisplaySizeSendFiles():string
  {
    let nBytes = 0;
    this.selectedFiles.filter((fl) => fl.sendFile == true).forEach((fl)=>{

      nBytes += fl.size;
    });
    return this.getDisplaySize(nBytes);
  }

  public getDisplaylimitLength():string
  {
    return this.getDisplaySize(this.limitLength ?? 0);
  }

  CancelDeleteFile(ev:any)
  {

    this.modalConfirmDeleteFiles?.closeModal();

  }

  ConfirmDeleteFile(ev:any)
  {
    this.selectedFiles.splice(this.indexFileDelete,1)
    this.updateQuantityFiles();
    this.modalConfirmDeleteFiles?.closeModal();
    this.uploadedFiles.emit(this.selectedFiles);
  }


  public getDisplaySizeSelectedFiles():string
  {
    let nBytes = 0;
    this.selectedFiles.filter((fl) => fl.sendFile == false).forEach((fl)=>{

      nBytes += fl.size;
    });
    return this.getDisplaySize(nBytes);
  }

  deleteFile(file:FilesUpload,index:any)
  {

    this.indexFileDelete = index;
    this.modalConfirmDeleteFiles?.setTitle('Atenção.');
    this.modalConfirmDeleteFiles?.setMessage(`Deseja realmente deletar esse arquivo ${file.name} ?`);
    this.modalConfirmDeleteFiles?.openModal();
    /*delete form server*/
  }


  isLimitExceededAllFiles():boolean
  {

    if (!this.limitLength)
       return false;
    let selectedFilesSendCount = 0;

    for (let index = 0; index < this.selectedFiles.length; index++) {
      selectedFilesSendCount += this.selectedFiles[index].size;
    }
    if (selectedFilesSendCount < this.limitLength)
    return false;

    return true;


  }



  public getDisplaySizeAllFiles():string
  {
    let nBytes = 0;
    this.selectedFiles.forEach((fl)=>{

      nBytes += fl.size;
    });
    return this.getDisplaySize(nBytes);
  }

  showMessageError(message:string)
  {
    this.toastr.error(message,'',{"positionClass": "toast-bottom-right"});
  }

  showMessageSuccess(message:string)
  {
    this.toastr.success(message,'',{"positionClass": "toast-bottom-right"});
  }

  showMessageWarning(message:string)
  {
    this.toastr.warning(message,'',{"positionClass": "toast-bottom-right"});
  }

  getDisplaySize(bytes:number)
  {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt((Math.floor(Math.log(bytes) / Math.log(1024))).toString());
    return Math.round(bytes / Math.pow(1024, i)).toString() + ' ' + sizes[i];
  }

  getDisplaySizeFile(file:File):string
  {

    return this.getDisplaySize(file.size);

  }

  updateQuantityFiles()
  {
    this.quantityAllFiles = this.selectedFiles.length;

  }

  chooseFile(files: FileList | null) {
    if (files)
    {
      if (files.length  === 0) {
        return;
      }
      for (let i = 0; i < files.length ; i++) {

        if (this.selectedFiles.map((m)=>m.name).includes(files[i].name))
        {
          this.showMessageWarning(`Atenção ${files[i].name} já existe na seleção.`)
          continue;
        }
        let extension =  `.${(files[i].name.split('.').pop() ?? '')}`
        if (this.Invalidsextensions.includes(extension))
        {
          this.showMessageWarning(`Atenção extensão ${extension} inválida.`)
          continue;
        }

        this.selectedFiles.push(
          {
            name: files[i].name,
            size: files[i].size,
            displaySize:this.getDisplaySizeFile(files[i]),
            id:'',
            sendFile:false,
            file: files[i]
          }
        );
      }
      this.updateQuantityFiles();
      this.uploadedFiles.emit(this.selectedFiles);
    }
  }

  ngOnInit(): void {

  }

  constructor(private uploadService:UploadService, private toastr: ToastrService){}

}
