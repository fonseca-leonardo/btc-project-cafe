import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.page.html',
  styleUrls: ['./exchange.page.scss'],
})
export class ExchangePage implements OnInit {
  public etherPrice: number = 12.96;
  public etherCalculated: number = 0;
  public etherValue: number = 16801;
  public rateValue: number = 0;

  constructor(
    private userService: UserService,
    private storage: Storage,
    private router: Router,
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

  onChange(event: Event) {
    this.etherCalculated =
      Number((event.target as HTMLInputElement).value) * this.etherPrice;
    this.rateValue = this.etherValue * 0.05 * this.etherCalculated;
  }

  async onSubmit() {
    const transactions = await this.storage.get('transactions');

    if (transactions) {
      transactions.unshift({
        value: this.rateValue * -1,
        date: this.formatDate(new Date()),
        userData: await this.userService
          .getUserName(await this.storage.get('token'))
          .toPromise(),
        cryptoType: 'BTC',
      });

      await this.storage.set('transactions', transactions);
    } else {
      await this.storage.set('transactions', [
        {
          value: this.rateValue * -1,
          date: this.formatDate(new Date()),
          userData: await this.userService
            .getUserName(await this.storage.get('token'))
            .toPromise(),
          cryptoType: 'BTC',
        },
      ]);
    }

    this.userService.showMessage('Transferência realizada');
  }

  formatDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  goBack() {
    this.location.back();
  }
}
