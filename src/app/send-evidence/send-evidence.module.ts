import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendEvidenceAppComponent } from './send-evidence.app.component';
import { SendEvidenceFormComponent } from './send-evidence-form/send-evidence-form.component';
import { SendEvidenceRoutingModule } from './send-evidence-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SendEvidenceService } from './services/send-evidence.service';

@NgModule({
  declarations: [SendEvidenceAppComponent, SendEvidenceFormComponent],
  imports: [
    CommonModule,
    SendEvidenceRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ], providers:[SendEvidenceService]
})
export class SendEvidenceModule { }
