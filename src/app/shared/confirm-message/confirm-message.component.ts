import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-message',
  templateUrl: './confirm-message.component.html',
  styleUrls: ['./confirm-message.component.css']
})
export class ConfirmMessageComponent implements OnInit {

  @ViewChild('content') modalConfirm: ElementRef | undefined;
  @Output     () btnOkReturn     = new EventEmitter();
  @Output     () btnCancelReturn = new EventEmitter();
  @Input() modalTitle:string = '';
  @Input() modalText:string  = '';

  private modalConfirmComponentRef: NgbModalRef | undefined;

  @Input() ngbModalOptions: NgbModalOptions = {
    windowClass: 'custom-modal',
    centered   : true
  };

  constructor( private modalService: NgbModal) { }


  setModalOptions(ngbModalOptions:NgbModalOptions)
  {

    this.ngbModalOptions = ngbModalOptions;
  }

  setTitle(title:string)
  {
    this.modalTitle = title;

  }

  setMessage(text:string)
  {

    this.modalText = text;
  }

  cancel() {
    this.btnCancelReturn.emit();
  }

  confirm() {
    this.btnOkReturn.emit();
  }


  closeModal() {
    if (this.modalConfirmComponentRef !== undefined)
      this.modalConfirmComponentRef.close();
  }

  openModal() {
    this.modalConfirmComponentRef = this.modalService.open(
      this.modalConfirm,
      this.ngbModalOptions
    );
  }

  ngOnInit(): void {
  }

}
