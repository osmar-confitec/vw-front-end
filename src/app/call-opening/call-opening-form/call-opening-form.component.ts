import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import CallOpening from './models/callOpening';
import { validateOnlyNumber } from '../../util/form-validate-custom'
import { ToastrService } from 'ngx-toastr';
import { TextMaskModule } from 'angular2-text-mask';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CallsService } from '../services/calls.service';
import SendItensSelected from '../tree-view-categories/models/send-itens-selected';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
import { ConfirmMessageComponent } from 'src/app/shared/confirm-message/confirm-message.component';
import { UploadFilesComponent } from 'src/app/shared/upload-files/upload-files.component';
import FilesUpload from 'src/app/shared/upload-files/models/files-upload';
import { FilesUploadState } from 'src/app/shared/upload-files/models/files-upload-state';

import { environment } from 'src/environments/environment';
import CallsOpeningPreferencesResponse from './models/calls-opening-preferences-response';

@Component({
  selector: 'app-call-opening-form',
  templateUrl: './call-opening-form.component.html',
  styleUrls: ['./call-opening-form.component.css']
})
export class CallOpeningFormComponent implements OnInit, OnDestroy {
  @ViewChild('upload') uploadFiles: UploadFilesComponent | undefined;
  callOpeningForm: FormGroup;
  callOpeningModel: CallOpening;
  modalReference: any;
  modalReferenceUsersList: any;
  users: Users = new Users();
  filesUpload: FilesUpload[] = [];
  callsOpeningPreferencesResponse: CallsOpeningPreferencesResponse | undefined;
  subscallsService: any;
  formSubmeted: boolean = false;
  limitUpload: number = environment.limitUpload;
  public Invalidsextensions: Array<string> = ['.bat', '.chm', '.cmd', '.com', '.exe', '.hlp', '.cpl', '.crt', '.hta', '.inf', '.ins', '.isp', '.jar', '.java', '.jse', '.lnk', '.mdb', '.ms', '.msi', '.pcd', '.pif', '.ps1', '.m3u', '.m3u8', '.reg', '.src', '.sct', '.shs', '.vb', '.vbe', '.vbs', '.ws'];
  public maskTelephone = ['+', /[1-9]/, /\d/, '-',  /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public maskCelTelephone = ['+', /[1-9]/, /\d/, '-',  /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  constructor(private callsService: CallsService,
    private toastr: ToastrService,
    private usersService: UsersService,
    private modalService: NgbModal) {
    this.callOpeningModel = new CallOpening();
    this.callOpeningForm = new FormGroup({
      name: new FormControl(this.callOpeningModel.name, [Validators.required]),
      categoriesSelected: new FormControl(this.callOpeningModel.categoriesSelected, [Validators.required]),
      //telephone:new FormControl(this.callOpeningModel.telephone,[validateOnlyNumber(12)]),
      telephone: new FormControl(this.callOpeningModel.telephone),
      plate: new FormControl(this.callOpeningModel.plate),
      email: new FormControl(this.callOpeningModel.email),
      ala: new FormControl(this.callOpeningModel.ala, [Validators.required]),
      userId: new FormControl(this.callOpeningModel.userId, [Validators.required]),
      floor: new FormControl(this.callOpeningModel.floor, [Validators.required]),
      cellPhone: new FormControl(this.callOpeningModel.cellPhone),
      reference: new FormControl(this.callOpeningModel.reference),
      column: new FormControl(this.callOpeningModel.column),
      nameContact: new FormControl(this.callOpeningModel.nameContact),
      phoneContact: new FormControl(this.callOpeningModel.phoneContact),
      emailContact: new FormControl(this.callOpeningModel.emailContact),
      title: new FormControl(this.callOpeningModel.title, [Validators.required]),
      side: new FormControl(this.callOpeningModel.side, [Validators.required]),
      collaborator: new FormControl(this.callOpeningModel.collaborator, [Validators.required]),
      workschedule: new FormControl(this.callOpeningModel.workschedule, [Validators.required]),
      locality: new FormControl(this.callOpeningModel.locality, [Validators.required]),
      description: new FormControl(this.callOpeningModel.description, [Validators.required])
    });
  }

  showMessageAlert(message: string) {
    this.toastr.warning(message, '', { "positionClass": "toast-bottom-right" });
  }

  showMessageError(message: string) {
    this.toastr.error(message, '', { "positionClass": "toast-bottom-right" });
  }

  showMessageSuccess(message: string) {
    this.toastr.success(message, '', { "positionClass": "toast-bottom-right" });
  }

  ngOnDestroy(): void {
    // this.subscallsService.unsubscribe();
  }

  uploadedFiles(filesUpload: FilesUpload[]) {
    this.filesUpload = filesUpload;
  }

  get telephone() { return this.callOpeningForm.get('telephone') }
  get ala() { return this.callOpeningForm.get('ala') }
  get floor() { return this.callOpeningForm.get('floor') }
  get side() { return this.callOpeningForm.get('side') }
  get cellPhone(){return this.callOpeningForm.get('cellPhone')}
  get workschedule() { return this.callOpeningForm.get('workschedule') }
  get collaborator() { return this.callOpeningForm.get('collaborator') }
  get locality() { return this.callOpeningForm.get('locality') }
  get title() { return this.callOpeningForm.get('title') }
  get name() { return this.callOpeningForm.get('name') }
  get column() { return this.callOpeningForm.get('column') }
  get nameContact() { return this.callOpeningForm.get('nameContact') }
  get emailContact() { return this.callOpeningForm.get('emailContact') }

  get phoneContact() { return this.callOpeningForm.get('phoneContact') }

  get userId() { return this.callOpeningForm.get('userId') }
  get plate() { return this.callOpeningForm.get('plate') }
  get description() { return this.callOpeningForm.get('description') }
  get categoriesSelected() { return this.callOpeningForm.get('categoriesSelected') }
  get reference(){ return this.callOpeningForm.get('reference') }

  openLg(content: any) {
    this.modalReference = this.modalService.open(content, { size: 'lg' });
  }

  sendItensSelected(sendItensSelected: SendItensSelected) {
    this.callOpeningModel.categoryParentCI = (sendItensSelected.callCategoryOpeningParentCIChecked?.value ?? '');
    this.callOpeningForm.patchValue({
      categoriesSelected: 'Selected',
      title: sendItensSelected.callCategoryOpeningParentCIChecked?.path
    });
    this.modalReference.close();
  }

  resetForm() {

    if (this.callsOpeningPreferencesResponse)
    {
      this.callsOpeningPreferencesResponse.ala  = this.ala?.value ?? '';
      this.callsOpeningPreferencesResponse.telephone = this.telephone?.value;
      this.callsOpeningPreferencesResponse.userId = this.userId?.value;
      this.callsOpeningPreferencesResponse.findPreferences = true;
      this.callsOpeningPreferencesResponse.cellPhone = this.cellPhone?.value;
      this.callsOpeningPreferencesResponse.workSchedule = this.workschedule?.value;
      this.callsOpeningPreferencesResponse.collaborator = this.collaborator?.value;
      this.callsOpeningPreferencesResponse.locality = this.locality?.value;
      this.callsOpeningPreferencesResponse.reference = this.reference?.value;
      this.callsOpeningPreferencesResponse.floor = this.floor?.value;
      this.callsOpeningPreferencesResponse.side = this.side?.value;
      this.callsOpeningPreferencesResponse.column = this.column?.value;
      this.callsOpeningPreferencesResponse.nameContact = this.nameContact?.value;
      this.callsOpeningPreferencesResponse.phoneContact = this.phoneContact?.value;
      this.callsOpeningPreferencesResponse.emailContact = this.emailContact?.value;

    }

    this.callOpeningForm.reset();
    this.callOpeningModel = new CallOpening();
    this.formSubmeted = false;
    this.callOpeningForm.patchValue({
      name: this.callOpeningModel.name,
      categoriesSelected: this.callOpeningModel.categoriesSelected,
      telephone: this.callOpeningModel.telephone,
      plate: this.callOpeningModel.plate,
      ala: this.callOpeningModel.ala,
      userId: this.callOpeningModel.userId,
      email: this.callOpeningModel.email,
      floor: this.callOpeningModel.floor,
      cellPhone: this.callOpeningModel.cellPhone,
      reference: this.callOpeningModel.reference,
      column: this.callOpeningModel.column,
      phoneContact: this.callOpeningModel.phoneContact,
      emailContact: this.callOpeningModel.emailContact,
      title: this.callOpeningModel.title,
      side: this.callOpeningModel.side,
      collaborator: this.callOpeningModel.collaborator,
      workschedule: this.callOpeningModel.workschedule,
      locality: this.callOpeningModel.locality,
      description: this.callOpeningModel.description
    });

    this.updateUserCallOpening(this.users);


    this.setCallsOpeningPreferences(this.callsOpeningPreferencesResponse);

  }

  changeUserCallOpenning(userslist: any) {
    this.modalReferenceUsersList = this.modalService.open(userslist, { size: 'lg' });
  }



  sendCall() {
    this.formSubmeted = true;

    if (this.callOpeningForm.valid && this.callOpeningForm.dirty) {
      /*aqui */

      if (this.uploadFiles?.isLimitExceededAllFiles()) {

        this.showMessageAlert(` Atenção tamanho dos arquivos ultrapassa os limites que é de ${this.uploadFiles.getDisplaylimitLength()} `);
        return;
      }

      this.callOpeningModel = Object.assign({}, this.callOpeningModel, this.callOpeningForm.value);
      this.subscallsService = this.callsService.callsOpeningSendFiles(this.filesUpload, this.callOpeningModel).subscribe((subs) => {
        this.resetForm();
        this.uploadFiles?.clearUploadFiles();
        this.showMessageSuccess('Chamado Enviado com Sucesso');
      }, err => {
        this.callsService.serviceError(err)
      })
    }

  }

  fieldIsValid(field: any): boolean {
    return (this.formSubmeted && field?.invalid) || (field?.invalid && (field?.dirty || field?.touched))
  }


  setCallsOpeningPreferences(callsOpeningPreferencesResponse: CallsOpeningPreferencesResponse | undefined) {
    if (callsOpeningPreferencesResponse?.findPreferences) {
      this.callOpeningForm.patchValue({

        telephone: callsOpeningPreferencesResponse?.telephone,
        userId: callsOpeningPreferencesResponse?.userId,
        cellPhone: callsOpeningPreferencesResponse?.cellPhone,
        workschedule: callsOpeningPreferencesResponse?.workSchedule,
        collaborator: callsOpeningPreferencesResponse?.collaborator,
        locality: callsOpeningPreferencesResponse?.locality,
        reference: callsOpeningPreferencesResponse?.reference,
        ala: callsOpeningPreferencesResponse?.ala,
        floor: callsOpeningPreferencesResponse?.floor,
        side: callsOpeningPreferencesResponse?.side,
        column: callsOpeningPreferencesResponse?.column,
        nameContact: callsOpeningPreferencesResponse?.nameContact,
        phoneContact: callsOpeningPreferencesResponse?.phoneContact,
        emailContact: callsOpeningPreferencesResponse?.emailContact
      });
    }
  }

  updateUserCallOpening(user: Users | undefined) {

    this.callOpeningForm.patchValue({
      email: user?.email,
      plate: user?.plate,
      userId: user?.userId,
      name: user?.name
    });
  }
  selectedUser(user: Users) {
    this.users = user;
    this.updateUserCallOpening(user);
    this.getPreferences();
    this.modalReferenceUsersList.close();
  }

  getPreferences() {
    if (this.users.userId) {
        this.callsService.callOpeningPreferences({ userId: this.users.userId }).subscribe((pref) => {
          if (pref.data?.findPreferences) {
            this.callsOpeningPreferencesResponse = pref.data;
            this.setCallsOpeningPreferences(pref.data);
          }
          else {
            let prefEmpty = new CallsOpeningPreferencesResponse();
            prefEmpty.findPreferences = true;
            prefEmpty.userId = this.users.userId;
            this.callsOpeningPreferencesResponse = prefEmpty;
            this.setCallsOpeningPreferences(prefEmpty);
          }
        });
    }
  }

  ngOnInit(): void {

    this.usersService.getUsersLogged().subscribe((subs) => {
      this.users = subs.data ?? new Users();
      this.updateUserCallOpening(subs.data);
      this.getPreferences();

    }, error => this.usersService.serviceError(error))


  }

}
