import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

interface Transaction {
  value: number;
  date: string;
  cryptoType: 'BTC' | 'ETH' | 'LTC';
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public transactions: Transaction[] = [];

  public transactionsToShow: Transaction[] = this.transactions;

  constructor(private storage: Storage, private router: Router) {}

  async ngOnInit(): Promise<void> {
    if (!(await this.storage.get('token'))) {
      this.router.navigate['/'];
    }

    const storageTransactions = await this.storage.get('transactions');

    if (storageTransactions) {
      this.transactions = storageTransactions;
      this.transactionsToShow = storageTransactions;
    }
  }

  public async refresh() {
    const storageTransactions = await this.storage.get('transactions');

    if (storageTransactions) {
      this.transactions = storageTransactions;
      this.transactionsToShow = storageTransactions;
    }
  }

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

      this.storage.set('transactions', this.transactions);
    }
  }

  formatDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}
