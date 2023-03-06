import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { DataServiceService } from './data-service.service';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
  constructor(private servicio: DataServiceService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.servicio.showLoader();
    return next.handle(request).pipe(
      finalize(() => {
        this.servicio.hideLoader();
      })
    );
  }
}
