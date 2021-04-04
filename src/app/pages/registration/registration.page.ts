import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCreateData } from 'src/app/model/userCreateModel.ngtypecheck';
import { UserService } from 'src/app/service/user.service';

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
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  register() {
    if (this.createUser.email !== this.createUser.emailConfirmation) return;

    if (this.createUser.password !== this.createUser.passwordConfirmation)
      return;

    this.userService.userCreate(this.createUser).subscribe((e) => {
      this.router.navigate(['/login']);
    });
  }
}
