import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {JwtClientService} from "../jwt/jwt-client.service";
import {JwtPayload} from "../../models/jwt-payload";

@Injectable()
export class AuthClientService {

    private _user = null;

    constructor(public jwtClient: JwtClientService) {

        this.user().then((user) => {
            console.log(user);
        });
    }


    user(): Promise<Object> {

        return new Promise((resolve) => {
            if (this._user) {
                resolve(this._user);
            }

            this.jwtClient.getPayLoad().then((payload: JwtPayload) => {
                if(payload){
                    this._user = payload.user;
                }

                resolve(this._user);
            })
        });
    }

    check():Promise<boolean>{
        return this.user().then(user => {
           user = localStorage.getItem('token')
           return user !== null;
        });

    }

    login({email, password}) {
        return this.jwtClient.acessToken({email, password});


    }

    logout() {
        return this.jwtClient.revokeToke()
            .then(() => {
                this._user = null;
            });
    }


}
