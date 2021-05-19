import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Storage } from '@ionic/storage';

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

  constructor(private userService: UserService, private storage: Storage) {}

  ngOnInit() {}

  onChange(event: number) {
    this.etherCalculated = event * this.etherPrice;
    this.rateValue = this.etherValue * 0.05 * this.etherCalculated;
  }

  async onSubmit() {
    const transactions = await this.storage.get('transactions');

    if (transactions) {
      transactions.unshift({
        value: this.rateValue * -1,
        date: this.formatDate(new Date()),
        cryptoType: 'BTC',
      });

      await this.storage.set('transactions', transactions);
    } else {
      await this.storage.set('transactions', [
        {
          value: this.rateValue * -1,
          date: this.formatDate(new Date()),
          cryptoType: 'BTC',
        },
      ]);
    }

    this.userService.showMessage('Transferência realizada');
  }

  formatDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}
