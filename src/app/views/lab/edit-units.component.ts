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




@Component({
  templateUrl: 'edit-units.component.html'
})
export class EditUnitsComponent implements OnInit{

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
  formLabNumber;
  funcao;

  lab_title ;
  lab_description ;

  fontChoices = [
    {
      label: '',
      value: ""
    },

  ];
  labModal;
  brandFont: any;
  defaultFont: any;


  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  libraries;
  librarieslab;



  constructor(private router: Router,private modalService: BsModalService,private ref: ChangeDetectorRef,private route: ActivatedRoute,public labService: LabService, public themeService: ThemeService) {

  }

  ngOnInit() {



    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },

    ];
   /* this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];*/
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 20,
      allowSearchFilter: true,

    };





    this.defaultFont = this.fontChoices[0];
    this.brandFont = Object.assign(this.defaultFont.label);


    this.route.queryParams
    .filter(params => params.id)
    .subscribe(params => {
      console.log('Edit Units'+params); // {order: "popular"}

      this.id_lab = params.id;

     },err => {
          if(err.error.message == 'The token could not be parsed from the request' || err.error.message == 'The token has been blacklisted'){
              this.router.navigate(['/login']);
              }
      this.hideChildModal();
      this.erroShowChildModal();
    });

     this.buscaTheme();
     this.buscaNotebooks();
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

  editLabor(){




    var Libraryjson = JSON.stringify(this.lab);
    var Libraryarray = JSON.parse(Libraryjson);
     console.log(Libraryarray)
    let lab = {id:this.id_lab,description:'',number:''};

    console.log('Name: '+this.formLabTitle);
    console.log('Name: '+this.formLabNumber);

    if(this.formLabTitle != undefined){
      lab.description=this.formLabTitle;
    }else{
      lab.description=Libraryarray.description;
    }

    if(this.formLabNumber != undefined){
      lab.number=this.formLabNumber;
    }else{
      lab.number=Libraryarray.title;

    }




   if(lab.number != undefined || lab.description != undefined ){

        let config = {
          backdrop: true,
          ignoreBackdropClick: false
        };


            this.showChildModal();
            let labs2 ;
              this.labService.updateUnit(lab).subscribe((data) => {
              labs2 = data;
              console.log(data);
              this.hideChildModal();

           },err => {
          if(err.error.message == 'The token could not be parsed from the request' || err.error.message == 'The token has been blacklisted'){
              this.router.navigate(['/login']);
              }
            this.hideChildModal();
            this.erroShowChildModal();
          })
         // this.router.navigate(['lab/ListLab']);

  }


  }
  delete(){

    if( this.labModal != undefined ){
      let lab = {id:this.labModal};
      this.showChildModal();
      let labs2 ;
        this.labService.deleteDay(lab).subscribe((data) => {
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
  buscaTheme(){
    this.labs = this.labService.getAlternativoUnit(parseInt(this.id_lab));
     this.labs.subscribe((nextExec: any) => {
      this.lab=nextExec.data;
      this.lab_title = nextExec.data.title;
      this.lab_description = nextExec.data.title;
      this.librarieslab = nextExec.data.notebooks.data;
      console.log(this.librarieslab);

      },err => {
          if(err.error.message == 'The token could not be parsed from the request' || err.error.message == 'The token has been blacklisted'){
              this.router.navigate(['/login']);
              }
      this.hideChildModal();
      this.erroShowChildModal();
    });

  }

  buscaNotebooks(){
    let theme = this.labService.notebooks();
      theme.subscribe((theme: any) => {

        //Alimenta dropdown
        this.dropdownList = [];
        let obj;


         for(let item of  theme ){
            obj={ item_id: item.id, item_text: item.description };
            this.dropdownList.push(obj);
         }
        //Alimenta selected dropdown
        this.selectedItems =  [];
        let obj2;
        console.log('Calado '+this.librarieslab );
        for(let item of  this.librarieslab ){
          obj2 = { item_id: item.id, item_text: item.description };
          this.selectedItems.push(obj2);
          console.log(obj2);

         }
         console.log(this.selectedItems);
         this.libraries=theme.data;



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
  //  console.log(theme.themes);
    this.themes=theme.themes;
    let contador = 1;
    let defaultTheme;
    for(let t of this.themes){
    //  console.log(t);
      let obj = {label:t.title,value:t.id};
      this.fontChoices.push(obj);
      //console.log('THEME-ID: '+ this.themeId+'  T-ID: '+t.id);

      if(t.id ==  this.themeId ){
   //       console.log('passou aqui'+ this.themeId);
      }
    //  console.log('passou aqui  calado'+ this.themeTitle);
      if(this.themeTitle == t.title){
        defaultTheme=contador;
    //    console.log('defaultTheme '+ defaultTheme +'contador '+contador);
      }

      contador++;
    }
    console.log('defaul Them '+defaultTheme);
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

  LibraryNote(){
    let libraries=[];
      for(var  lb of  this.selectedItems ){
          libraries.push(lb.item_id);
      }
      let item = {unit_id:this.id_lab,days:libraries};
      console.log(item);

      this.showChildModal();
      this.labService.librariesNote(item).subscribe((data) => {
        console.log('saida: '+data);
        this.hideChildModal();

     },err => {
          if(err.error.message == 'The token could not be parsed from the request' || err.error.message == 'The token has been blacklisted'){
              this.router.navigate(['/login']);
              }
      this.hideChildModal();
      this.erroShowChildModal();
    })
  }

  openModal2(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }
  openModal(template: TemplateRef<any>,func) {
    this.modalRef = this.modalService.show(template);
    this.funcao=func;
  }
  openModal3(template: TemplateRef<any>,func,lab) {
    this.modalRef = this.modalService.show(template);
   // console.log('cheguei na função:  ' + func);

    this.funcao=func;
    this.labModal=lab;
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




