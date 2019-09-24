import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {environment} from "../../../environments/environment";
import {RequestOptions, URLSearchParams} from "@angular/http";
import {Router} from "@angular/router";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class AlalyticsService {

    constructor(public authHttp: HttpClient, private router: Router) { }

    latest(page: number): Observable<any> {

        let params = new HttpParams();

        params = params.append('page', page + '');
        params = params.append('include', 'notebooks,type');



        return this.authHttp
            .get(`${environment.API_URL}/libraries`, {params: params})
            .map((response: any) => {response.data}).catch((err) => {

            localStorage.removeItem('token');
            this.router.navigate(['/auth/login']);

            return Observable.throw(err);
          });

    }

    get(id: number): Observable<any> {

      let params = new HttpParams();
      params = params.append('include', 'notebooks,type');


        return this.authHttp
            .get(`${environment.API_URL}/libraries/${id}`, {params: params})
            .map((response: any)=> {

                let data = response;
                let library = data.data;
                return library;
            }).catch((err) => {

            localStorage.removeItem('token');
            this.router.navigate(['/auth/login']);

            return Observable.throw(err);
          });
    }


    visitorsAndPageViews(): Observable<any> {

         return this.authHttp
             .get(`${environment.API_URL}/visitorsAndPageViews`);

     }

        topBrowsers(): Observable<any> {

          return this.authHttp
              .get(`${environment.API_URL}/topBrowsers`);

      }
      visitorsDevice(): Observable<any> {

        return this.authHttp
            .get(`${environment.API_URL}/visitorsDevice`);

    }
    visitorsAndPageViewsYears(): Observable<any> {

      return this.authHttp
          .get(`${environment.API_URL}/visitorsAndPageViewsYears`);

    }
    topBrowsersYear(): Observable<any> {

      return this.authHttp
          .get(`${environment.API_URL}/topBrowsersYear`);

    }
    visitorsDeviceYear(): Observable<any> {

    return this.authHttp
        .get(`${environment.API_URL}/visitorsDeviceYear`);

    }

}

