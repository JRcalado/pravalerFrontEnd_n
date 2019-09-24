import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/toPromise';
import {AuthClientService} from "../../services/auth/auth-client.service";
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{

  user = {
    email: '',
    password: ''
}

returnUrl: string;

    constructor(private router: Router,
      private route: ActivatedRoute,
      private auth: AuthClientService,
       ) {


    }

    ngOnInit() {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    }

    login() {
      this.auth.login(this.user)


          .pipe(first())
          .subscribe(
              data => {
                console.log('Sucess '+data.token);
                this.router.navigate(['/']);
              },
              error => {
                console.log('Error '+error);
              //  this.snackBar.open('E-mail e/ou senha inválidos', 'FECHAR' );
              });
  }


  afterLogin() {
      this.router.navigate(['/']);
  }

}
