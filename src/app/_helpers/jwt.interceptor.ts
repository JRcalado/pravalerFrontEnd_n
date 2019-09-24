import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';
import 'rxjs/add/observable/of';

import { RequestCache } from './request-cache.service';
import { log } from 'util';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private cache: RequestCache) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available


        let currentUser = localStorage.getItem('token');
        let token = localStorage.getItem('token');
        if (currentUser && token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        const cachedResponse = this.cache.get(request);
     // vou habilitar depois
    //return cachedResponse ? Observable.of(cachedResponse) : this.sendRequest(request, next, this.cache);

        return next.handle(request);
    }

    sendRequest(
      request: HttpRequest<any>,
      next: HttpHandler,
      cache: RequestCache): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {

            cache.put(request, event);
          }
        })
      );
    }
}
