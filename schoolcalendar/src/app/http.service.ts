import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class HttpService {
    baseUrl = '/api/staff/interface';
    AccessToken = 'EDH2GENLM1CETPDFU8POYA';

    constructor(private http: HttpClient, private message: NzMessageService) { }

    POST<T>(params, url = this.baseUrl): Observable<T> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'AccessToken': window['__AppWebkey'] || this.AccessToken
            })
        };
        params.Body = JSON.stringify(params.Body);
        return this.http.post<T>(url, params, httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            // this.message.create('error', error.error.message);
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // this.message.create('error', `Backend returned code ${error.status}, ` +
            //     `body was: ${error.error}`);
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };
}

