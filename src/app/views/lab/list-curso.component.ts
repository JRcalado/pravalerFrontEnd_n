import { Component ,ViewChild,TemplateRef} from '@angular/core';
import {LabService} from "../../services/query/lab.service";
import {Observable} from "rxjs/Observable";
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalDirective } from 'ngx-bootstrap/modal';



@Component({
  templateUrl: 'list-curso.component.html'
})
export class cursoComponent {
  labs: Observable<object>;
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
  id_lab;

  constructor(private modalService: BsModalService,public labService: LabService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {



    this.route.queryParams
    .filter(params => params.id)
    .subscribe(params => {
      console.log('Edit Units'+params); // {order: "popular"}

      this.id_lab = params.id;

      this.carregaCurso();

     },err => {
          if(err.error.message == 'The token could not be parsed from the request' || err.error.message == 'The token has been blacklisted'){
              this.router.navigate(['/login']);
              }
      this.hideChildModal();
      this.erroShowChildModal();
    });
  }

  carregaCurso(){
    this.labService.getCursos(parseInt(this.id_lab)).subscribe((nextExec: any) => {
      console.log(nextExec);
      this.labs= nextExec;
     },err => {
          if(err.error.message == 'The token could not be parsed from the request' || err.error.message == 'The token has been blacklisted'){
              this.router.navigate(['/login']);
              }
     this.hideChildModal();
     this.erroShowChildModal();
     console.log(err.error.message);

   });
  }

  redirLab(id){
    this.router.navigate(['/lab/EditCurso'],{ queryParams: { id: id } });
  }

  redirCurso(id){
    this.router.navigate(['/lab/ListCurso'],{ queryParams: { id: id } });
  }

  redirAluno(id){
    this.router.navigate(['/lab/ListAluno'],{ queryParams: { id: id ,insti:this.id_lab} });
  }


  openModal(template: TemplateRef<any>,func,lab) {
    this.modalRef = this.modalService.show(template);
    this.funcao=func;
    this.labModal=lab;
  }

  deleteLab(){
    if( this.labModal != undefined ){
        let lab = {id:this.labModal};
        this.showChildModal();
        let labs2 ;
          this.labService.deleteLab(lab).subscribe((data) => {
          labs2 = data;
          console.log(data);
          this.hideChildModal();
          this.carregaCurso();
        // this.router.navigate(['lab/ListLab']);
      },err => {
            if(err.error.message == 'The token could not be parsed from the request' || err.error.message == 'The token has been blacklisted'){
                this.router.navigate(['/login']);
                }
        this.hideChildModal();
        this.erroShowChildModal();
      })

  }
  }

  repassaModalFuncao(){

    this.modalRef.hide();
   this.funcao();

 }

}
