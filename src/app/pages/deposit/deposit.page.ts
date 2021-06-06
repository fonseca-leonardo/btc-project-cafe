import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage implements OnInit {
  encodedData: string = 'ffcde83b-c2c7-41c0-9cf6-5d66f7d17640';

  constructor(
    private storage: Storage,
    private router: Router,
    private userService: UserService,
    private location: Location
  ) {}

  async ngOnInit() {
    const oldToken = await this.storage.get('token');

    if (oldToken) {
      const newToken = await this.userService
        .refreshToken(await this.storage.get('token'))
        .toPromise();

      if (!newToken) {
        await this.storage.set('token', '');
        this.router.navigateByUrl('/login');
      } else {
        await this.storage.set(
          'token',
          await this.userService
            .refreshToken(await this.storage.get('token'))
            .toPromise()
        );
      }
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  goBack() {
    this.location.back();
  }
}
