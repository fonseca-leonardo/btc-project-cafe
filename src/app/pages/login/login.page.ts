import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/service/user.service';

interface UserLoginData {
  nickname: string;
  password: string;
}

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

  async ngOnInit() {}

  backToOrigin() {
    this.location.back();
  }

  async Login() {
    this.condition = true;
    const userReturn = await this.UserService.getUserName(
      await this.storage.get('token')
    ).toPromise();

    console.log(userReturn);
    this.UserService.userLogin(this.user)
      .subscribe(async (e) => {
        await this.storage.set('token', e.token);
        await this.storage.set('email', userReturn.userReturn.email);
        await this.router.navigate(['/tabs/tab1']);
        this.condition = false;
      })
      .add(() => (this.condition = false));
  }
}
