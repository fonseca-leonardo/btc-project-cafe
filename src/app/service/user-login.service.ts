import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserLoginData } from '../model/userLoginModel.ngtypecheck';

@Injectable({
  providedIn: 'root',
})
export class UserLoginService {
  private baseUrl = environment.baseApiUrl;
  constructor(private http: HttpClient) {}

  userLogin(user: UserLoginData): Observable<any> {
    const url = this.baseUrl + '/login';
    return this.http.post(url, user).pipe(
      map((obj: any) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    console.log('Ocorreu um erro!');
    return EMPTY;
  }
}
