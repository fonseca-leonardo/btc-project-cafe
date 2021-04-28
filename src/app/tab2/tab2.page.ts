import { DomElementSchemaRegistry } from '@angular/compiler';
import { Component } from '@angular/core';

interface Transaction {
  value: number;
  date: string;
  cryptoType: 'BTC' | 'ETH' | 'LTC';
}

interface coins {
  coinImage: string;

  coinName: string;
}
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  public transactions: Transaction[] = [
    {
      cryptoType: 'BTC',
      date: this.formatDate(new Date()),
      value: 100.12,
    },
    {
      cryptoType: 'BTC',
      date: this.formatDate(new Date()),
      value: -12.16,
    },
    {
      cryptoType: 'ETH',
      date: this.formatDate(new Date()),
      value: 51.0,
    },
    {
      cryptoType: 'LTC',
      date: this.formatDate(new Date()),
      value: 34.37,
    },
    {
      cryptoType: 'ETH',
      date: this.formatDate(new Date()),
      value: -34.37,
    },
  ];

  public transactionsToShow: Transaction[] = this.transactions;

  constructor() {}

  ngOnInit() {}

  public pesquisar(ev: CustomEvent) {
    let val: string = ev.detail.value;
    if (val.length === 0) {
      this.transactionsToShow = this.transactions;
    } else {
      this.transactionsToShow = this.transactions.filter(
        (transaction) =>
          transaction.cryptoType.toLocaleLowerCase() === val.toLowerCase()
      );
    }
  }

  public currentValue = 0;
  public maxValue = 0;
  public selectedValue = 0;

  public increment() {
    if (this.selectedValue !== 0) {
      this.transactions.unshift({
        value: this.selectedValue,
        date: this.formatDate(new Date()),
        cryptoType: 'BTC',
      });

      this.selectedValue = 0;
    }
  }

  formatDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}
