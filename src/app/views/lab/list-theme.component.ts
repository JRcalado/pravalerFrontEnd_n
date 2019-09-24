import { Component ,ViewChild,TemplateRef} from '@angular/core';
import {LabService} from "../../services/query/lab.service";
import {Observable} from "rxjs/Observable";
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalDirective } from 'ngx-bootstrap/modal';



@Component({
  templateUrl: 'list-theme.component.html'
})
export class ListThemeComponent {
  dados: Observable<object>;
  message: string;

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
  funcao;

  labModal;


  constructor(private modalService: BsModalService,public labService: LabService, private router: Router) { }

  ngOnInit() {
    this.verificaDeploy();
    this.carregaDados();
    console.log(this.dados);
  }
    redirUnit(id){
    this.router.navigate(['/lab/EditUnit'],{ queryParams: { id: id } });
  }

  openModal(template: TemplateRef<any>,func,lab) {
    this.modalRef = this.modalService.show(template);
    this.funcao=func;
    this.labModal=lab;
  }

  delete(){
    if( this.labModal != undefined ){
      let lab = {id:this.labModal};
      this.showChildModal();
      let labs2 ;
        this.labService.deleteTheme(lab).subscribe((data) => {
        labs2 = data;
        console.log(data);
        this.hideChildModal();
        this.carregaDados();

     },err => {
          if(err.error.message == 'The token could not be parsed from the request' || err.error.message == 'The token has been blacklisted'){
              this.router.navigate(['/login']);
              }
      this.hideChildModal();
      this.erroShowChildModal();
    })

  }
  }

  carregaDados(){
    this.labService.themes().subscribe((nextExec: any) => {
      console.log(nextExec.themes);
      this.dados= nextExec.themes;
     },err => {
          if(err.error.message == 'The token could not be parsed from the request' || err.error.message == 'The token has been blacklisted'){
              this.router.navigate(['/login']);
              }
     this.hideChildModal();
     this.erroShowChildModal();
   });
  }
  repassaModalFuncao(){

    this.modalRef.hide();
   this.funcao();

 }

 verificaDeploy(){
  this.labService.verificaDeploy().subscribe((nextExec: any) => {
    console.log(nextExec);

    if(nextExec  != null){
     nextExec;
     nextExec.deploy.id;
     console.log( nextExec.deploy);
     this.router.navigate(['/lab/Deploy']);
    }
  },err => {
      if(err.error.message == 'The token could not be parsed from the request' || err.error.message == 'The token has been blacklisted'){
          this.router.navigate(['/login']);
          }
  this.hideChildModal();
  this.erroShowChildModal();
});

}
}
