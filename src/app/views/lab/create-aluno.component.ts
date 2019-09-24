import { Component, OnInit,ChangeDetectorRef,TemplateRef, Injectable,ViewChild} from '@angular/core';
import {LabService} from "../../services/query/lab.service";
import {ThemeService} from "../../services/query/theme.service";

import {Observable} from "rxjs/Observable";
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { SharedataService } from '../../services/inside/sharedata.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { L } from '@angular/core/src/render3';




@Component({
  templateUrl: 'create-aluno.component.html'
})
export class CreateAlunoComponent implements OnInit{

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
  theme: Observable<object>;
  message: string;
  id_lab;
  lab=[];
  themes=[];
  nrSelect ;
  themeId;
  themeTitle;
  themeName;
  formLabTitle;
  funcao;

  fontChoices = [
    {
      label: '',
      value: ""
    },

  ];

  brandFont: any;
  defaultFont: any;

  status;
  name;
  duracao;
  intituicao;
  cpf;
  nascimento;
  email;
  celular;
  endereco;
  numero;
  bairro;
  cidade;
  uf;
  inst;

  constructor(private router: Router,private modalService: BsModalService,private ref: ChangeDetectorRef,private route: ActivatedRoute,public labService: LabService, public themeService: ThemeService) {

  }

  ngOnInit() {
    this.defaultFont = this.fontChoices[0];
    this.brandFont = Object.assign(this.defaultFont.label);


    this.route.queryParams
    .filter(params => params.id)
    .subscribe(params => {
      console.log(params); // {order: "popular"}

      this.id_lab = params.id;
      this.intituicao = params.id;
      this.inst = params.id_inst;
     },err => {
          if(err.error.message == 'The token could not be parsed from the request' || err.error.message == 'The token has been blacklisted'){
              this.router.navigate(['/login']);
              }
      this.hideChildModal();
      this.erroShowChildModal();
    });

    // this.buscaTheme();
    // this.ref.detectChanges();

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

  createLabor(){
    console.log('Novo ' +this.brandFont);

    console.log('status ' +this.status);

    console.log('Cnpj: '+this.duracao);
    console.log('Name: '+this.name);

    let lab = {name:this.name,
    cpf:this.cpf,
    nascimento:this.nascimento,
    email:this.email,
  celular:this.celular,
    endereco:this.endereco,
    numero:this.numero,
    bairro:this.bairro,
    cidade:this.cidade,
    uf:this.uf,curso:this.id_lab,status : this.status,id_inst:this.inst};


        console.log(lab);

            this.showChildModal();
            let labs2 ;
              this.labService.createAluno(lab).subscribe((data) => {
              labs2 = data;
              console.log(data);
              this.hideChildModal();
              this.router.navigate(['lab/ListInst'], { queryParams: { id: this.intituicao } });

           },err => {
          if(err.error.message == 'The token could not be parsed from the request' || err.error.message == 'The token has been blacklisted'){
              this.router.navigate(['/login']);
              }
            this.hideChildModal();
            this.erroShowChildModal();
          })





  }


  buscaTheme(){
    this.labs = this.labService.getAlternativoAlunos(parseInt(this.id_lab));
     this.labs.subscribe((nextExec: any) => {
       console.log(nextExec.data);
      this.lab=nextExec;
      //this.nrSelect= nextExec.data.theme.data.title;
      console.log(nextExec.data.theme.data.title);
      this.name  = nextExec.name;
      this.themeTitle = nextExec.data.theme.data.title;
      this.buscaTodosThemas();
      this.themeName= nextExec.data.title;
      },err => {
          if(err.error.message == 'The token could not be parsed from the request' || err.error.message == 'The token has been blacklisted'){
              this.router.navigate(['/login']);
              }
      this.hideChildModal();
      this.erroShowChildModal();
    });

  }

  buscaTodosThemas(){
    this.theme = this.themeService.get();
    this.theme.subscribe((theme: any) => {
    console.log(theme.data);
    this.themes=theme.data;
    let contador = 0;
    let defaultTheme;
    for(let t of this.themes){
      console.log(t);
      let obj = {label:t.title,value:t.id};
      this.fontChoices.push(obj);
      console.log('THEME-ID: '+ this.themeId+'  T-ID: '+t.id);

      if(t.id ==  this.themeId ){
          console.log('passou aqui'+ this.themeId);
      }
      console.log('passou aqui  calado'+ this.themeTitle);
      if(this.themeTitle == t.title){
        defaultTheme=contador;
        console.log('defaultTheme '+ defaultTheme +'contador '+contador);
      }

      contador++;
    }

    this.defaultFont = this.fontChoices[defaultTheme];

    this.brandFont = Object.assign(this.defaultFont.label);

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

  openModal2(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }
  openModal(template: TemplateRef<any>,func) {
    this.modalRef = this.modalService.show(template);
    this.funcao=func;
  }


  closeModal(){
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}




