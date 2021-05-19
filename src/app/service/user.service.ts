import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { UserCreateData } from '../model/userCreateModel.ngtypecheck';
import { UserLoginData } from '../model/userLoginModel.ngtypecheck';
import { ResponseLogin } from '../model/userResponseModel.ngtypecheck';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.baseApiUrl;
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  userLogin(user: UserLoginData): Observable<ResponseLogin> {
    const url = this.baseUrl + '/login';
    return this.http.post(url, user).pipe(
      map((obj: any) => obj),
      catchError((e) => this.errorHandler('Não foi possível logar', e))
    );
  }

  userCreate(user: UserCreateData): Observable<UserCreateData> {
    const url = this.baseUrl + '/register';
    const userInsert = {
      email: user.email,
      password: user.password,
      nickname: user.nickname,
    };
    return this.http.post(url, userInsert).pipe(
      map((obj: any) => obj),
      catchError((e) =>
        this.errorHandler('Não foi possível criar uma conta', e)
      )
    );
  }

  userRecoveryAccount(email: string): Observable<string> {
    const url = this.baseUrl + '/forgot-password';

    return this.http.post(url, { email }).pipe(
      map((obj: any) => obj),
      catchError((e) => this.errorHandler('Erro', e))
    );
  }

  userRecoveryPassword(token: string, newPassword: string): Observable<string> {
    const url = this.baseUrl + '/reset-password';

    return this.http.post(url, { token, newPassword }).pipe(
      map((obj: any) => obj),
      catchError((e) => this.errorHandler('Erro', e))
    );
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  errorHandler(msg: string, e: any): Observable<never> {
    this.showMessage(`Ocorreu um erro!: ${msg}`, true);
    console.log(e);
    return EMPTY;
  }
}
