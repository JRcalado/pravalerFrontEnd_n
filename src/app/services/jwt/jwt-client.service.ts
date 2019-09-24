import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {JwtCredentials} from '../../models/jwt-credentials';
import { JwtHelperService } from '@auth0/angular-jwt';
import {environment} from "../../../environments/environment";

import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable()
export class JwtClientService {


     jwtHelper = new JwtHelperService();


    private _token = null;
    private _payload = null;

    constructor(public authHttp: HttpClient,public http: HttpClient) {
        this.getToken();
        this.getPayLoad().then((payload) => {
            console.log(payload);
        })
    }

    getPayLoad(): Promise<Object> {
        return new Promise((resolve) => {
            if (this._payload) {
                resolve(this._payload);
            }

            this.getToken().then((token) => {
                if (token) {
                    this._payload = this.jwtHelper.decodeToken(token);
                }

                resolve(this._payload);
            })
        });
    }

    getToken(): Promise<string> {
        return new Promise((resolve) => {
            if (this._token) {
                resolve(this._token);
            }

            this._token = localStorage.getItem(environment.TOKEN_NAME);
            resolve(this._token);
        });
    }

    acessToken(jwtCredentials: JwtCredentials){


            return this.http.post<any>(`${environment.API_URL}/api/login`, jwtCredentials)
            .pipe(map(user => {
              console.log(user);
                if (user && user.access_token) {
                    console.log(user.access_token)
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem(environment.TOKEN_NAME, user.access_token);
                }

                return user.access_token;
            }));
    }

    revokeToke():Promise<null> {

        let headers = new Headers();
        headers.set('Authorization', `Bearer ${this._token}`);
        let requestOptions = new RequestOptions({headers});

        return this.authHttp.post(`${environment.API_URL}/api/logout`, {},)
            .toPromise()
            .then((response: Response) => {
                this._token = null;
                this._payload = null;
                localStorage.clear();
                return null;
            });
    }

}
