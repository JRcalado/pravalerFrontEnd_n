import { Component, OnInit,ChangeDetectorRef,TemplateRef, Injectable,ViewChild} from '@angular/core';
import {LabService} from "../../services/query/lab.service";
import {Observable} from "rxjs/Observable";
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalDirective } from 'ngx-bootstrap/modal';




@Component({
  templateUrl: 'edit-labs.component.html'
})
export class EditLabsComponent implements OnInit{

  @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild('erro') erro: ModalDirective;

  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }
  erroShowChildModal(): void {
    this.erro.show();
  }

  erroHideChildModal(): void {
    this.erro.hide();
  }

  bsModalRef: BsModalRef;
  modalRef: BsModalRef;


  public infoModal;

  labs: Observable<object>;

  message: string;
  id_lab;

  formLabTitle;
  funcao;

  brandFont: any;
  defaultFont: any;
  status;
  name;

 idDel;

  constructor(private router: Router,private modalService: BsModalService,private ref: ChangeDetectorRef,private route: ActivatedRoute,public labService: LabService) {

  }

  ngOnInit() {
    this.route.queryParams
    .filter(params => params.id)
    .subscribe(params => {
      console.log('Edit Labs'+params); // {order: "popular"}

      this.id_lab = params.id;

     },err => {
          if(err.error.message == 'The token could not be parsed from the request' || err.error.message == 'The token has been blacklisted'){
              this.router.navigate(['/login']);
              }
      this.hideChildModal();
      this.erroShowChildModal();
    });

     this.buscaTheme();

  }

  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  editLabor(){


    let lab = {id:this.id_lab,name:this.name,cnpj:this.formLabTitle,status:this.status};

              this.showChildModal();
              this.labService.updateLab(lab).subscribe((data) => {
              this.hideChildModal();
              this.router.navigate(['lab/ListInst']);

           },err => {
          if(err.error.message == 'The token could not be parsed from the request' || err.error.message == 'The token has been blacklisted'){
              this.router.navigate(['/login']);
              }
            this.hideChildModal();
            this.erroShowChildModal();
          })


  }

  buscaTheme(){
    this.labs = this.labService.getAlternativo(parseInt(this.id_lab));
     this.labs.subscribe((nextExec: any) => {

      this.name = nextExec.name;
      this.formLabTitle  = nextExec.cnpj;
      if(nextExec.status == 'true'){
        this.status = 1;
      }else{
        this.status = 0
      }
      //this.status=Boolean(Number(nextExec.status));
    //  this.ref.detectChanges();


      },err => {
          if(err.error.message == 'The token could not be parsed from the request' || err.error.message == 'The token has been blacklisted'){
              this.router.navigate(['/login']);
              }
      this.hideChildModal();
      this.erroShowChildModal();
    });

  }

  editLab(){

     this.modalRef.hide();
    this.funcao();

  }


  deleteUnit(){
      if( this.idDel != undefined ){
          let lab = {id:this.idDel};
            this.showChildModal();
            let labs2 ;
              this.labService.deleteUnit(lab).subscribe((data) => {
              labs2 = data;
              console.log(data);
              this.hideChildModal();
                this.buscaTheme();

           },err => {
          if(err.error.message == 'The token could not be parsed from the request' || err.error.message == 'The token has been blacklisted'){
              this.router.navigate(['/login']);
              }
            this.hideChildModal();
            this.erroShowChildModal();
          })

    }
  }

  openModal2(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }
  openModal(template: TemplateRef<any>,func) {
    this.modalRef = this.modalService.show(template);
    this.funcao=func;
  }
  openModal3(template: TemplateRef<any>,func,id) {
    this.modalRef = this.modalService.show(template);
    this.funcao=func;
    this.idDel=id;

  }


  closeModal(){
    this.bsModalRef.content.closeBtnName = 'Close';
  }


  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}




