import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';


@Injectable()
export class ThemeService {

    constructor( private router: Router, private authHttp: HttpClient) {

    }

    latest(page: number): Observable<any> {
        let params = new HttpParams();

        params = params.append('page', page + '');
        params = params.append('include', 'theme,background,libraries');

        return this.authHttp
            .get(`${environment.API_URL}/labs`, {params: params })
            .map((response: any) => response.data).catch((err) => {

            localStorage.removeItem('token');
            this.router.navigate(['/login']);

            return Observable.throw(err);
          });
    }



    get(): Observable<any> {

      let params = new HttpParams();

      params = params.append('include', 'theme,background,libraries');



        return this.authHttp
            .get(`${environment.API_URL}/themes`)
            .map((response: any) => {
                console.log(response);
                let data = response;
            let themes = data;

                return themes;
            }).catch((err) => {
              console.log(err);
            localStorage.removeItem('token');
            this.router.navigate(['/login']);

            return Observable.throw(err);
          });
    }

}
