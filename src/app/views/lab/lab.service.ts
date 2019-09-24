import {Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';


@Injectable()
export class LabService {

    constructor( private router: Router, private authHttp: HttpClient) {

    }

    latest(page: number): Observable<any> {
        let params = new HttpParams();

        params = params.append('page', page + '');
        params = params.append('include', 'theme,background,libraries');

        return this.authHttp
            .get(`${environment.API_URL}/api/instituicoes`)
            .map((response: any) =>{
              console.log(response);
            }
            ).catch((err) => {

            localStorage.removeItem('token');
            this.router.navigate(['/login']);

            return Observable.throw(err);
          });
    }

    get(id: number): Observable<any> {

      let params = new HttpParams();

      params = params.append('include', 'theme,background,libraries');
        return this.authHttp
            .get(`${environment.API_URL}/labs/${id}`, {params: params });

    }

    getAlternativo(id: number){

      let params = new HttpParams();

      params = params.append('include', 'theme,background,libraries');
        return this.authHttp
            .get(`${environment.API_URL}/labs/${id}`, {params: params })
            .map((response: any) => {
                console.log(response);
                let data = response;
            let lab = data;
                return lab;
            }).catch((err) => {
              console.log(err);
            localStorage.removeItem('token');
            this.router.navigate(['/login']);

            return Observable.throw(err);
          });
    }
    getAlternativoUnit(id: number){

      let params = new HttpParams();

      params = params.append('include', 'notebooks');
        return this.authHttp
            .get(`${environment.API_URL}/libraries/${id}`, {params: params })
            .map((response: any) => {
                console.log(response);
                let data = response;
            let lab = data;
                return lab;
            }).catch((err) => {
              console.log(err);
            localStorage.removeItem('token');
            this.router.navigate(['/login']);

            return Observable.throw(err);
          });
    }

    updateLab(lab): Observable<any> {


      const formData = new FormData();
      formData.append('id', lab.id);
      formData.append('theme_id', lab.theme_id);
      formData.append('title', lab.title);

        return this.authHttp
            .post(`${environment.API_URL}/labsEdit`,formData)



    }
    updateUnit(lab): Observable<any> {

      console.log(lab);
      const formData = new FormData();
      formData.append('id', lab.id);
      formData.append('description', lab.description);
      formData.append('title', lab.number);

        return this.authHttp
            .post(`${environment.API_URL}/unitsEdit`,formData)



    }


    createLab(lab): Observable<any> {

      const body = new HttpParams()
      .set('title', lab.title);
      const formData = new FormData();

      formData.append('title', lab.title);

        return this.authHttp
            .put(`${environment.API_URL}/labsCreate`, body.toString(),
            {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/x-www-form-urlencoded')
            }
            )

    }
    createUnit(lab): Observable<any> {

      const body = new HttpParams()
      .set('title', lab.title)
      .set('number', lab.number)
      .set('lab', lab.lab);
      const formData = new FormData();



        return this.authHttp
            .put(`${environment.API_URL}/unitCreate`, body.toString(),
            {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/x-www-form-urlencoded')
            }
            )

    }
    createDay(lab): Observable<any> {

      const body = new HttpParams()
      .set('title', lab.title)
      .set('number', lab.number)
      .set('file_capa', lab.file_capa)
      .set('lab_id',lab.lab);
      const formData = new FormData();



        return this.authHttp
            .put(`${environment.API_URL}/dayCreate`, body.toString(),
            {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/x-www-form-urlencoded')
            }
            )

    }

    createImage(lab,file): Observable<any> {

      console.log(lab);
      const formData = new FormData();

      formData.append('description', lab.number);
      formData.append('title', lab.title);
      formData.append('thumb_file', file);

        return this.authHttp
            .post(`${environment.API_URL}/backgroundCreate`,formData)

    }
    deleteLab(lab): Observable<any> {


      const formData = new FormData();

      formData.append('id', lab.id);
    console.log('teste');
        return this.authHttp
            .post(`${environment.API_URL}/api/instidelete`,formData)
    }

    deleteUnit(lab): Observable<any> {


      const formData = new FormData();

      formData.append('id', lab.id);

        return this.authHttp
            .post(`${environment.API_URL}/librariesDelete`,formData)
    }

    deleteDay(lab): Observable<any> {


      const formData = new FormData();

      formData.append('id', lab.id);

        return this.authHttp
            .post(`${environment.API_URL}/dayDelete`,formData)
    }
    deleteImage(lab): Observable<any> {
      const formData = new FormData();
      formData.append('id', lab.id);

        return this.authHttp
            .post(`${environment.API_URL}/backgroundDelete`,formData)
    }

    deleteTheme(lab): Observable<any> {

        const formData = new FormData();
        formData.append('id', lab.id);

        return this.authHttp
            .post(`${environment.API_URL}/themesDelete`,formData)
    }


  libraries(): Observable<any> {

    let params = new HttpParams();

    params = params.append('include', 'theme,background,libraries');



      return this.authHttp
          .get(`${environment.API_URL}/libraries`)
          .map((response: any) => {
              console.log(response);
              let data = response;
          let libraries = data.data;
          console.log(libraries);
              return libraries;
          }).catch((err) => {
            console.log(err);
          localStorage.removeItem('token');
          this.router.navigate(['/login']);

          return Observable.throw(err);
        });
  }
  templates(): Observable<any> {


      return this.authHttp
          .get(`${environment.API_URL}/templates`)
          .map((response: any) => {
              console.log(response);
              let data = response;
          let libraries = data.data;
          console.log(libraries);
              return libraries;
          }).catch((err) => {
            console.log(err);
          localStorage.removeItem('token');
          this.router.navigate(['/login']);

          return Observable.throw(err);
        });
  }
  notebooks(): Observable<any> {

    let params = new HttpParams();

    params = params.append('include', 'theme,background,libraries');



      return this.authHttp
          .get(`${environment.API_URL}/notebooks`)
          .map((response: any) => {
              console.log(response);
              let data = response;
          let libraries = data.data;
          console.log(libraries);
              return libraries;
          }).catch((err) => {
            console.log(err);
          localStorage.removeItem('token');
          this.router.navigate(['/login']);

          return Observable.throw(err);
        });
  }
  exercises(): Observable<any> {

    let params = new HttpParams();

    params = params.append('include','items,template');


      return this.authHttp
          .get(`${environment.API_URL}/exercises`)
          .map((response: any) => {
              console.log(response);
              let data = response;
          let libraries = data.data;
          console.log(libraries);
              return libraries;
          }).catch((err) => {
            console.log(err);
          localStorage.removeItem('token');
          this.router.navigate(['/login']);

          return Observable.throw(err);
        });
  }
  exercisesUnic(id){
    let params = new HttpParams();

       params = params.append('include','items,template');


          return this.authHttp
          .get(`${environment.API_URL}/exercises/${id}`, {params: params })
          .map((response: any) => {
              console.log(response);
              let data = response;
          let lab = data;
              return lab;
          }).catch((err) => {
            console.log(err);
          localStorage.removeItem('token');
          this.router.navigate(['/login']);

          return Observable.throw(err);
        });
  }

 librariesLab(item): Observable<any> {
console.log(item.libraries);
var json = Object.assign({}, item.libraries);
console.log(json);

    const formData = new FormData();
    let libraries= JSON.stringify(json)
    formData.append('libraries', libraries);
    formData.append('lab_id', item.lab_id);

      return this.authHttp
          .post(`${environment.API_URL}/labsLibrary`,formData)

  }
  librariesNote(item): Observable<any> {
    console.log(item.days);
    var json = Object.assign({}, item.days);
    console.log(json);

        const formData = new FormData();
        let days= JSON.stringify(json)
        formData.append('days', days);
        formData.append('unit_id', item.unit_id);

          return this.authHttp
              .post(`${environment.API_URL}/notesLibrary`,formData)
      }
  dayExercises(item): Observable<any> {
        console.log(item.exercises);
        var json = Object.assign({}, item.exercises);
        console.log(json);

            const formData = new FormData();
            let exercises= JSON.stringify(json)
            formData.append('exercises', exercises);
            formData.append('day_id', item.day_id);

              return this.authHttp
                  .post(`${environment.API_URL}/dayExercises`,formData)
          }

      notebooksDays(): Observable<any> {
        return this.authHttp
            .get(`${environment.API_URL}/notebooks`);


    }
    themes(): Observable<any> {
      return this.authHttp
          .get(`${environment.API_URL}/themes`);


  }
    backgroundsAll(): Observable<any> {
      return this.authHttp
          .get(`${environment.API_URL}/backgrounds`);


  }
  templatesAll(): Observable<any> {
    return this.authHttp
        .get(`${environment.API_URL}/templatesAll`);


}
  backgroundUnic(id){

    const formData = new FormData();
        formData.append('id', id);

      return this.authHttp

      .post(`${environment.API_URL}/backgroundUnicTeste`,formData)



  }
    notebooksExer(id: number){

      let params = new HttpParams();

      params = params.append('include', 'exercises');
        return this.authHttp
            .get(`${environment.API_URL}/notebooks/${id}`, {params: params })
            .map((response: any) => {
                console.log(response);
                let data = response;
            let lab = data;
                return lab;
            }).catch((err) => {
              console.log(err);
            localStorage.removeItem('token');
            this.router.navigate(['/login']);

            return Observable.throw(err);
          });
    }

    themeUnic(id: number){

      return this.authHttp
            .get(`${environment.API_URL}/themes/${id}`)
            .map((response: any) => {
                console.log(response);
                let data = response;
            let lab = data;
                return lab;
            }).catch((err) => {
              console.log(err);
            localStorage.removeItem('token');
            this.router.navigate(['/login']);

            return Observable.throw(err);
          });
    }


    exercisesAll(): Observable<any> {

      let params = new HttpParams();

      params = params.append('include','items,supplement,template');



        return this.authHttp
            .get(`${environment.API_URL}/exercises`)
            .map((response: any) => {
                console.log(response);
                let data = response;
            let libraries = data.data;
            console.log(libraries);
                return libraries;
            }).catch((err) => {
              console.log(err);
            localStorage.removeItem('token');
            this.router.navigate(['/login']);

            return Observable.throw(err);
          });
    }

    updateDay(lab): Observable<any> {

      console.log(lab);
      const formData = new FormData();
      formData.append('id', lab.id);
      formData.append('description', lab.description);
      formData.append('title', lab.number);
      formData.append('file_capa', lab.file_capa);

        return this.authHttp
            .post(`${environment.API_URL}/daysEdit`,formData)



    }

    updateTheme(lab): Observable<any> {

      console.log(lab);
      const formData = new FormData();
      formData.append('id', lab.id);
      formData.append('description', lab.description);
      formData.append('title', lab.title);
      formData.append('file_capa', lab.file_capa);
      formData.append('color', lab.color);
      formData.append('logo', lab.logo);

        return this.authHttp
            .post(`${environment.API_URL}/themesEdit`,formData)

    }
    createTheme(lab): Observable<any> {

      console.log(lab);
      const formData = new FormData();

      formData.append('description', lab.description);
      formData.append('title', lab.title);
      formData.append('file_capa', lab.file_capa);
      formData.append('color', lab.color);
      formData.append('logo', lab.logo);

        return this.authHttp
            .post(`${environment.API_URL}/themesCreate`,formData)

    }
    updateImage(lab,file): Observable<any> {

      console.log(lab);
      const formData = new FormData();
      formData.append('id', lab.id);
      formData.append('description', lab.description);
      formData.append('title', lab.number);
      formData.append('thumb_file', file);

        return this.authHttp
            .post(`${environment.API_URL}/backgroundUpdate`,formData)


    }
    updateExercicio(lab,file,file2): Observable<any> {

      console.log(lab);
      const formData = new FormData();

      formData.append( 'id' ,lab.id);
      formData.append('name_id' ,lab.name_id);
      formData.append('introduction_title' ,lab.introduction_title);
      formData.append('introduction' ,lab.introduction);
      formData.append('file' ,file);
      formData.append( 'recording' ,lab.recording);
      formData.append( 'audio_player' ,lab.audio_player);
      formData.append('audio_file' ,file2);
      formData.append( 'image' ,lab.image);
      formData.append('video_player' ,lab.video_player);
      formData.append('text' ,lab.text);
      formData.append('text_box' ,lab.text_box);
      formData.append('template_id' ,lab.template_id);
      formData.append('horizintal' ,lab.horizintal);
      formData.append('simulation' ,lab.simulation);
      formData.append('you' ,lab.you);

        return this.authHttp
            .post(`${environment.API_URL}/exercisesupdate`,formData)


    }
    createExercicio(lab,file,file2): Observable<any> {

      console.log(lab);
      const formData = new FormData();


      formData.append('name_id' ,lab.name_id);
      formData.append('introduction_title' ,lab.introduction_title);
      formData.append('introduction' ,lab.introduction);
      formData.append('file' ,file);
      formData.append( 'recording' ,lab.recording);
      formData.append( 'audio_player' ,lab.audio_player);
      formData.append('audio_file' ,file2);
      formData.append( 'image' ,lab.image);
      formData.append('video_player' ,lab.video_player);
      formData.append('text' ,lab.text);
      formData.append('text_box' ,lab.text_box);
      formData.append('template_id' ,lab.template_id);
      formData.append('horizintal' ,lab.horizintal);
      formData.append('you' ,lab.you);
      formData.append('simulation' ,lab.simulation);
      formData.append('id_day' ,lab.id_day);

        return this.authHttp
            .post(`${environment.API_URL}/exerciseCreate`,formData)


    }

    deleteExercicio(lab): Observable<any> {
      const formData = new FormData();
      formData.append('id', lab.id);

        return this.authHttp
            .post(`${environment.API_URL}/exerciseDelete`,formData)
    }



    itemUnic(id){

      const formData = new FormData();
          formData.append('id', id);

        return this.authHttp
            .post(`${environment.API_URL}/itemUnicN`,formData)
            .map((response: any) => {
                console.log(response);
                let data = response;
            let lab = data;
                return lab;
            }).catch((err) => {
              console.log(err);
            localStorage.removeItem('token');
            this.router.navigate(['/login']);

            return Observable.throw(err);
          });
    }

    updateItem(lab,file,file_extra,imagem_file,imagem_file_extra,video_file): Observable<any> {

      console.log(lab);
      const formData = new FormData();



      formData.append('id',lab.id);
      formData.append('question',lab.question);
      formData.append('question_two',lab.question_two);
      formData.append('question_three',lab.question_three);
      formData.append('question_four',lab.question_four);
      formData.append('answer',lab.answer);
      formData.append('answer_two',lab.answer_two);
      formData.append('answer_three',lab.answer_three);
      formData.append('answer_four',lab.answer_four);
      formData.append('answer_five',lab.answer_five);

      formData.append('hint',lab.hint);
      formData.append('video',lab.video);

      formData.append('type',lab.type);
      formData.append('audio',lab.audio);
      formData.append('imagem',lab.imagem);
      formData.append('imagem_extra',lab.imagem_extra);
      formData.append('audio_extra',lab.audio_extra);
      formData.append('record',lab.record);
      formData.append('case_sensitive',lab.case_sensitive);
      formData.append('you',lab.you);
      formData.append('time_rec',lab.time_rec);
      formData.append('order',lab.order);

      formData.append('file',file);
      formData.append('file_extra',file_extra);
      formData.append('thumb',imagem_file);
      formData.append('file_extra_img',imagem_file_extra);
      formData.append('file_video',video_file);


        return this.authHttp
            .post(`${environment.API_URL}/updateItem`,formData)


    }
    createItem(lab,file,file_extra,imagem_file,imagem_file_extra,video_file): Observable<any> {

      console.log(lab);
      const formData = new FormData();



      formData.append('exercise_id',lab.exercise_id);
      formData.append('question',lab.question);
      formData.append('question_two',lab.question_two);
      formData.append('question_three',lab.question_three);
      formData.append('question_four',lab.question_four);
      formData.append('answer',lab.answer);
      formData.append('answer_two',lab.answer_two);
      formData.append('answer_three',lab.answer_three);
      formData.append('answer_four',lab.answer_four);
      formData.append('answer_five',lab.answer_five);

      formData.append('hint',lab.hint);
      formData.append('video',lab.video);

      formData.append('type',lab.type);
      formData.append('audio',lab.audio);
      formData.append('imagem',lab.imagem);
      formData.append('imagem_extra',lab.imagem_extra);
      formData.append('audio_extra',lab.audio_extra);
      formData.append('record',lab.record);
      formData.append('case_sensitive',lab.case_sensitive);
      formData.append('you',lab.you);
      formData.append('time_rec',lab.time_rec);
      formData.append('order',lab.order);

      formData.append('file',file);
      formData.append('file_extra',file_extra);
      formData.append('thumb',imagem_file);
      formData.append('file_extra_img',imagem_file_extra);
      formData.append('file_video',video_file);


        return this.authHttp
            .post(`${environment.API_URL}/createItem`,formData)


    }
    deleteItem(lab): Observable<any> {
      const formData = new FormData();
      formData.append('id', lab.id);

        return this.authHttp
            .post(`${environment.API_URL}/deleteItem`,formData)
    }

    deploy(): Observable<any> {

     // let params = new HttpParams();


        return this.authHttp
            .get(`${environment.API_URL}/deploy`);

    }

    cadastraDeploy(lab): Observable<any> {
      const formData = new FormData();

      formData.append('tipo', lab.tipo);
      formData.append('email', lab.email);
      formData.append('descricao', lab.descricao);
       let data = lab.data+' '+lab.hora;
      formData.append('data', data);

        return this.authHttp
            .post(`${environment.API_URL}/cadastraDeploy`,formData)
    }

    verificaDeploy(): Observable<any> {

      // let params = new HttpParams();


         return this.authHttp
             .get(`${environment.API_URL}/verificaDeploy`);

     }

     cancelarAgenda(lab){
      const formData = new FormData();
      formData.append('id', lab.id);

        return this.authHttp
            .post(`${environment.API_URL}/cancelarAgenda`,formData)
     }
     deletarAgenda(lab){
      const formData = new FormData();
      formData.append('id', lab.id);

        return this.authHttp
            .post(`${environment.API_URL}/deletarAgenda`,formData)
     }


     restaurarDeploy(lab){
      const formData = new FormData();
      formData.append('id', lab.id);

        return this.authHttp
            .post(`${environment.API_URL}/restaurarDeploy`,formData)
     }
     refazerDeploy(lab){
      const formData = new FormData();
      formData.append('id', lab.id);

        return this.authHttp
            .post(`${environment.API_URL}/refazerDeploy`,formData)
     }

     templateUnic(id){

      const formData = new FormData();
          formData.append('id', id);

        return this.authHttp

        .post(`${environment.API_URL}/templateUnic`,formData)



    }
    templateUpdate(lab): Observable<any> {

      console.log(lab);
      const formData = new FormData();



      formData.append('id',lab.id);
      formData.append('name',lab.name);
      formData.append('tipo',lab.tipo);
      formData.append('descricao',lab.desc);
      formData.append('functions',lab.functions);
      formData.append('campos',lab.campos);
      formData.append('info',lab.info);
      formData.append('labels',lab.labels);



        return this.authHttp
            .post(`${environment.API_URL}/templateUpdate`,formData)


    }
    templateStatus(lab): Observable<any> {

      console.log(lab);
      const formData = new FormData();
       formData.append('id',lab.id);
      formData.append('status',lab.status);

        return this.authHttp
            .post(`${environment.API_URL}/templateStatus`,formData)


    }


    templateCreate(lab): Observable<any> {

      console.log(lab);
      const formData = new FormData();
      formData.append('name',lab.name);
      formData.append('tipo',lab.tipo);
      formData.append('descricao',lab.desc);
      formData.append('functions',lab.functions);
      formData.append('campos',lab.campos);
      formData.append('info',lab.info);
      formData.append('labels',lab.labels);



        return this.authHttp
            .post(`${environment.API_URL}/templateCreate`,formData)


    }
    templateDestroy(lab): Observable<any> {


      const formData = new FormData();
      formData.append('id',lab.id);



        return this.authHttp
            .post(`${environment.API_URL}/templateDestroy`,formData)


    }
}
