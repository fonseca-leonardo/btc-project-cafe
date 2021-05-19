import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

interface User {
  password: string;
  passwordConfirmation: string;
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  user: User = {
    password: '',
    passwordConfirmation: '',
  };
  token: string;

  constructor(
    private activatedRouter: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRouter.params.subscribe((e) => {
      this.token = e.token;
    });
  }

  submit() {
    if (
      this.user.password !== this.user.passwordConfirmation &&
      this.user.password !== ''
    )
      return;

    this.userService
      .userRecoveryPassword(this.token, this.user.password)
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
