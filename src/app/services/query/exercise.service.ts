import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {environment} from "../../../environments/environment";
import {RequestOptions, URLSearchParams} from "@angular/http";
import {AuthClientService} from "../auth/auth-client.service";
import {Router} from "@angular/router";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class ExerciseService {

  constructor(public authHttp: HttpClient,
              public auth: AuthClientService,
              private router: Router) {
  }

  latest(page: number): Observable<any> {
      let params = new HttpParams();

    params = params.append('page', page + '');
    params = params.append('include','items,supplement,template');


    return this.authHttp
      .get(`${environment.API_URL}/exercises`, {params: params})
      .map((response: any) => {
        response.data
      }).catch((err) => {

        localStorage.removeItem('token');
        this.router.navigate(['/auth/login']);

        return Observable.throw(err);
      });

  }

  get(id: number): Observable<any> {

    let params = new HttpParams();
     params = params.append('include','items,supplement,template');

    return this.authHttp
      .get(`${environment.API_URL}/exercises/${id}`, {params: params})
      .map((response:any) => {

        let data = response;
        let exercise = data.data;
        console.log('teste qury aqui passei');
        console.log(exercise);
        return exercise;

      }).catch((err) => {

        console.log('PEGUEI O ERROOOOOOOOOOO');
        localStorage.removeItem('token');
        this.router.navigate(['/auth/login']);

        return Observable.throw(err);
      });
  }

}
