import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
//import {AuthHttp} from "angular2-jwt";
import {Http} from '@angular/http';

import {environment} from "../../../environments/environment";
import {RequestOptions, URLSearchParams} from "@angular/http";
import {Router} from "@angular/router";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';


@Injectable()
export class VideoService {


    constructor(public authHttp: Http, private router: Router) {

    }

    getVideos() {
        return this.authHttp.get(`${environment.API_URL}/videos`)
            .map(response => response.json());
    }


    latest(page: number): Observable<any> {
        let params = new URLSearchParams();
        params.set('page', page + '');
        params.set('include', 'serie_title,categories_name');

        let requestOptions = new RequestOptions({params})

        return this.authHttp
            .get(`${environment.API_URL}/videos`, requestOptions)
            .map(response => response.json().data).catch((err) => {

            localStorage.removeItem('token');
            this.router.navigate(['/auth/login']);

            return Observable.throw(err);
          });
    }

    get (id: number): Observable<any> {
        let params = new URLSearchParams();
        params.set('include', 'serie_title,categories_name');

        let requestOptions = new RequestOptions({params})
        return this.authHttp
            .get(`${environment.API_URL}/videos/${id}`, requestOptions)
            .map(response => {

                let data = response.json();
                let video = data.data;
                video.serie_title = typeof video.serie_title == "undefined" ? null : data.data.serie_title.data.title;
                video.categories_name = data.data.categories_name.data.names;
                return video;
            }).catch((err) => {

            localStorage.removeItem('token');
            this.router.navigate(['/auth/login']);

            return Observable.throw(err);
          });
    }

}
