import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserCreateData } from '../model/userCreateModel.ngtypecheck';
import { UserLoginData } from '../model/userLoginModel.ngtypecheck';
import { ResponseLogin } from '../model/userResponseModel.ngtypecheck';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.baseApiUrl;
  constructor(private http: HttpClient) {}

  userLogin(user: UserLoginData): Observable<ResponseLogin> {
    const url = this.baseUrl + '/login';
    return this.http.post(url, user).pipe(
      map((obj: any) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  userCreate(user: UserCreateData): Observable<UserCreateData> {
    const url = this.baseUrl + '/register';
    return this.http.post(url, user).pipe(
      map((obj: any) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<never> {
    console.log('Ocorreu um erro!: ', e);
    return EMPTY;
  }
}
