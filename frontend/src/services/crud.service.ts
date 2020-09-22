import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment} from '../environments/environment'
@Injectable()

export class CrudService {
    user_informations: any;
    public url = environment.api_url
    public token :any;

    httpOptions :any;
    httpOptions_with_token:any;

    constructor(private http: HttpClient) {
        this.token = localStorage.getItem("token");
        this.user_informations = JSON.parse(localStorage.getItem("currentUser"));
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }
        this.httpOptions_with_token = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "token": this.token 
            })
        }
       
       
    }


    login(path,data): Observable<any> {
        return this.http.post<any>(this.url +path, JSON.stringify(data), this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            )
    }
    post_with_json(path,data): Observable<any> {
        return this.http.post<any>(this.url +path,data,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "token":localStorage.getItem("token")
            })
        })
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            )
    }
    post(path,data): Observable<any> {
        return this.http.post<any>(this.url +path,data,{
            headers: new HttpHeaders({
                "token":localStorage.getItem("token")
            })
        })
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            )
    }
    get(path) {
        return this.http.get<any>(this.url +path,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "token":localStorage.getItem("token")
            })
        })
        .pipe(
            retry(1),
            catchError(this.errorHandl)
        )
    }

    errorHandl(error) {
        let errorMessage = '';
        return "error"
    }


}