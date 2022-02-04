import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { UploadService } from './upload-files/services/upload.service';
import { ConfirmMessageComponent } from './confirm-message/confirm-message.component';



@NgModule({
  declarations: [
    UploadFilesComponent,
    ConfirmMessageComponent
  ],
  imports: [
    CommonModule
  ],
  providers:[UploadService],
  exports:[UploadFilesComponent,ConfirmMessageComponent]
})
export class SharedModule { }
