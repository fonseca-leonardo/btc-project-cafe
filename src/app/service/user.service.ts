import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

interface UserCreateData {
  nickname: string;
  email: string;
  emailConfirmation: string;
  password: string;
  passwordConfirmation: string;
}

interface UserLoginData {
  nickname: string;
  password: string;
}

interface ResponseLogin {
  token: string;
}

interface UserReturn {
  nickname: string;
  email: string;
}

interface TokenReturn {
  token: string;
}

export interface UserData {
  userReturn: UserReturn;
}

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

  getUserName(token: string): Observable<UserData> {
    const url = this.baseUrl + '/auth';

    const authorization = 'bearer ' + token;

    return this.http.post(url, { authorization }).pipe(
      map((obj: any) => obj),
      catchError((e) => this.errorHandler('Erro', e))
    );
  }

  refreshToken(token: string): Observable<TokenReturn> {
    const url = this.baseUrl + '/refresh-auth';

    return this.http.post(url, { token }).pipe(
      map((obj: any) => obj),
      catchError((e) => this.errorHandler('Erro', e))
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
