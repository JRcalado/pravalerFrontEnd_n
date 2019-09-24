import {Injectable} from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AuthClientService} from "./auth-client.service";

@Injectable()
export class AlwaysAuthGuardService implements CanActivate {

    constructor(public authClient: AuthClientService,
                private router: Router
    ) {
    }

    canActivate() {

        return this.authClient.check().then(isLogged => {
          console.log('passe');
            if (!isLogged) {

                //this.router.navigate(['/login']);

                setTimeout(() =>{
                    this.router.navigate(['/login']);
                });

                return false;
            }
            return true;
        })
    }
}
