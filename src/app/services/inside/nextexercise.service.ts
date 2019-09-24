import { Injectable, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ExercisedataService } from "./exercisedata.service";
import { Router } from '@angular/router';
import { TemplatedataService } from "./templatedata.service";
import { FindnextexercisedataService } from "./findnextexercisedata.service";
import { ExerciseService } from '../query/exercise.service';
import {SharedataService} from "./sharedata.service";





@Injectable()


export class NextexerciseService {



  allExercises = [];

  nextExercise: number;
  exerciseQuery: any;
  exercise = [];
  exercise2: Observable<object>;
  exercise23;
  idEx;

  library: Observable<object>;
  notebook = [];
  lab;
  background;
  bigbg;
  type;
  day;
  obj ;
  recebeObj;
  exerciseId;
  libraryId;
  labIdentificador;


    constructor(
      public exercisedataService: ExercisedataService,
      public templatedataService: TemplatedataService,
      public findnextexercisedataService: FindnextexercisedataService,
      public exerciseService: ExerciseService,
      private shareData: SharedataService,
      private router: Router) {


      }

  public redirecionadaEx(): void {
    this.carregaExercise();

    if (this.allExercises[this.allExercises.indexOf(this.nextExercise)] != undefined) {
      this.onExerciseQuery(this.nextExercise);
    }else{
      this.redoMenuInterno();
    }
  }
  public redo(): void {
    this.carregaExercise();


    var reduExercise = this.exerciseId - 1;
    if (this.allExercises[this.allExercises.indexOf(reduExercise)] != undefined) {
      this.onExerciseQuery(reduExercise);
    }else{
      this.redoMenuInterno();
    }
  }
  public redoMenu(): void{
    this.carregaExercise();
    this.redoMenuInterno();
  }

  private carregaExercise(){
    this.exercisedataService.exerciseSource.subscribe((exercise: string) => {
      this.exerciseId = exercise['exercise'];
      this.day = exercise['day'];
      this.notebook = exercise['notebook'];
      this.background = exercise['background'];
      this.lab = exercise['lab'];
      this.type = exercise['type'];
      this.library = exercise['library'];
      this.bigbg = exercise['bigbg'];
      this.obj = exercise['obj'];
      this.recebeObj=this.obj;
      this.nextExercise = exercise['next'];
      this.allExercises = exercise['allExercises'];
      this.labIdentificador =  exercise['labIdentificador'];
      //this.libraryId = exercise['libraryId'];
      console.log('aqui mano porra');
      console.log(this.notebook['library'].id)
      console.log(' '+ this.notebook['library'].id +' '+this.lab );
    });
  }




  private  onExerciseQuery(id) {

      //TIRAR O TEMPLATE ANTERIOR DA VIEW
    // this.templatedataService.templateSource.next(0);
    // this.templatedataService.filter(0);
      console.log('CHAMOU QUERY--------' + id);


      this.exerciseQuery = this.exerciseService.get(id);
      this.exerciseQuery.subscribe(
        (exercise: string) => {

          this.idEx = exercise['id'];
          console.log("aqui caladinho ");
          console.log(exercise);
          this.exercise23 = exercise;
          this.nextExerciseMetodo(this.idEx);
        });



    }
  private  nextExerciseMetodo(id){
      console.log(this.exercise23);

      console.log('E PARA PESQUISAR O EXERICIO NUERMO ' + id);
      console.log('E PARA PESQUISAR O EXERICIO NUERMO ' + id);

      //Encontrar Próximo Exercicio
      console.log('EXERCICIO ATUAL ' + id);

      if (this.allExercises[this.allExercises.indexOf(id) + 1] != undefined) {
        this.nextExercise = this.allExercises[this.allExercises.indexOf(id) + 1];

      } else {
        this.nextExercise = 0;
      }
      console.log('Proximo exercicio: '+this.nextExercise);

      this.exercise['exercise'] = id;
      this.exercise['day'] = this.day;
      this.exercise['notebook'] = this.notebook;
      this.exercise['background'] = this.background;
      this.exercise['lab'] = this.lab;
      this.exercise['type'] = this.type;
      this.exercise['library'] = this.library;
      this.exercise['bigbg'] = this.bigbg;
      this.exercise['obj'] = this.exercise23;
      this.exercise['next'] = this.nextExercise;
      this.exercise['allExercises'] = this.allExercises;
      this.exercise['labIdentificador'] = this.labIdentificador;

      this.exercisedataService.exerciseSource.next(this.exercise);
      this.exercisedataService.filter(this.exercise);

      this.templatedataService.templateSource.next(2);
      this.templatedataService.filter(2);

      this.findnextexercisedataService.findnextexerciseSource.next(this.nextExercise);
      this.findnextexercisedataService.filter(this.nextExercise);

      this.templateNew(this.exercise['obj']['template'].data.id);
  }

  private templateNew(template){
    console.log('redireciona para template: ' +template  );
    switch (template) {
      case 1:
        this.router.navigate(['/template-04']);
        break;
      case 2:
        this.router.navigate(['/template-03']);
        break;
      case 10:
        this.router.navigate(['/template-10']);
        break;
      case 11:
        this.router.navigate(['/template-11']);
        break;
      case 12:
        this.router.navigate(['/template-12']);
        break;
      case 13:
        this.router.navigate(['/template-13']);
        break;
      case 14:
        this.router.navigate(['/template-14']);
        break;
      case 15:
        this.router.navigate(['/template-15']);
        break;
      case 16:
        this.router.navigate(['/template-16']);
        break;
      case 17:
        this.router.navigate(['/template-17']);
        break;
      case 18:
        this.router.navigate(['/template-18']);
        break;
      case 19:
        this.router.navigate(['/template-19']);
        break;
      case 20:
        this.router.navigate(['/template-20']);
        break;
      case 21:
        this.router.navigate(['/template-21']);
        break;
      case 22:
        this.router.navigate(['/template-22']);
        break;
      default:
        this.router.navigate(['']);
      }
  }


  private redoMenuInterno() {

    this.library['library'] = this.notebook['library'].id;
    this.library['background'] = this.background;
    this.library['bigbg'] = this.bigbg;
    this.library['lab'] = this.lab;
    this.library['labIdentificador'] = this.labIdentificador;
    this.shareData.dataSource.next(this.library);
    this.shareData.filter(this.library);
    this.router.navigate(['/dashboard/teste']);

  }


}
