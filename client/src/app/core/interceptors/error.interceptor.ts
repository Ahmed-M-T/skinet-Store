import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, delay, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router,private toastr:ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   //throw new Error("Method not implemented.");
    return next.handle(request).pipe(
      catchError(error=>{
        if(error){
           
          if(error.status===400){
            if(error.error.errors){
              throw error.error;
            }else{
            this.toastr.error(error.error.errors.message,error.error.statusCode);
            }
          }
          if(error.status===401){
            this.toastr.error(error.error.errors.message,error.error.statusCode);
          }
          if(error.status===404){
            this.router.navigateByUrl('/not-found');
          }
          
          if(error.status===500){
            const navigationExtras:NavigationExtras={
              state:{error:error.error}
            };
            this.router.navigateByUrl('/server-error',navigationExtras);
          }
        }
        const err = new Error(error);
        return throwError(() => error);
      })
    );
  }
}
