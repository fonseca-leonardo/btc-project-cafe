import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

interface UserCreateData {
  nickname: string;
  email: string;
  emailConfirmation: string;
  password: string;
  passwordConfirmation: string;
}


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  createUser: UserCreateData = {
    nickname: '',
    email: '',
    emailConfirmation: '',
    password: '',
    passwordConfirmation: '',
  };
  condition: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {}

  backToOrigin() {
    this.location.back();
  }

  register() {
    if (this.createUser.email !== this.createUser.emailConfirmation) return;

    if (this.createUser.password !== this.createUser.passwordConfirmation)
      return;

    this.condition = true;

    this.userService
      .userCreate(this.createUser)
      .subscribe((e) => {
        this.condition = false;
        this.router.navigate(['/login']);
      })
      .add(() => {
        this.condition = false;
      });
  }
}
