import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { UserLoginData } from 'src/app/model/userLoginModel.ngtypecheck';
import { UserLoginService } from 'src/app/service/user-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: UserLoginData = {
    nickname: '',
    password: '',
  };

  constructor(
    private UserLoginService: UserLoginService,
    private router: Router,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();
  }

  Login() {
    this.UserLoginService.userLogin(this.user).subscribe(async (e) => {
      await this.storage.set('token', e.token);
      this.router.navigate(['/tabs/tab1']);
    });
  }
}
