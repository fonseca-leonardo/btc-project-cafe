import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserLoginData } from 'src/app/model/userLoginModel.ngtypecheck';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  condition: boolean = false;
  user: UserLoginData = {
    nickname: '',
    password: '',
  };

  constructor(
    private UserService: UserService,
    private router: Router,
    private storage: Storage,
    private location: Location
  ) {}

  ngOnInit() {}

  backToOrigin() {
    this.location.back();
  }

  Login() {
    this.condition = true;
    this.UserService.userLogin(this.user)
      .subscribe(async (e) => {
        await this.storage.set('token', e.token);
        this.router.navigate(['/tabs/tab1']);
        this.condition = false;
      })
      .add(() => (this.condition = false));
  }
}
