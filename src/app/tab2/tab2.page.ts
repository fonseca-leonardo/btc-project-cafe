import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserData, UserService } from '../service/user.service';

interface Transaction {
  value: number;
  date: string;
  email: string;
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

  constructor(
    private storage: Storage,
    private router: Router,
    private userService: UserService
  ) {}

  async filterStorageTransaction(storageTransaction: Transaction) {
    const email = await this.storage.get('email');

    if (storageTransaction.email === email) {
      return storageTransaction;
    }
  }

  async filterTransactions() {
    const storageTransactions = (await this.storage.get(
      'transactions'
    )) as Transaction[];

    let filterStorageTransactions: Transaction[] = [];

    if (storageTransactions) {
      for (const storageTransaction of storageTransactions) {
        const formatStorageTransaction = await this.filterStorageTransaction(
          storageTransaction
        );

        if (formatStorageTransaction) {
          filterStorageTransactions.push(formatStorageTransaction);
        }
      }
      this.transactions = storageTransactions;
    }

    if (filterStorageTransactions[0] !== undefined) {
      this.transactionsToShow = filterStorageTransactions;
    }
  }

  async ngOnInit(): Promise<void> {
    const oldToken = await this.storage.get('token');

    if (oldToken) {
      const newToken = await this.userService
        .refreshToken(await this.storage.get('token'))
        .toPromise();

      if (!newToken) {
        await this.storage.set('token', '');
        await this.storage.set('email', '');
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
      await this.storage.set('email', '');
      this.router.navigateByUrl('/login');
    }

    this.filterTransactions();
  }

  public async refresh() {
    this.filterTransactions();
  }

  public async pesquisar(ev: Event) {
    let val: string = (ev.target as HTMLInputElement).value;
    const verifyEmail = await this.storage.get('email');

    if (val.length === 0) {
      this.transactionsToShow = this.transactions.filter((transaction) => {
        if (transaction.email === verifyEmail) {
          return transaction;
        }
      });
    } else {
      this.transactionsToShow = this.transactions.filter((transaction) => {
        if (
          transaction.cryptoType.toLocaleLowerCase() === val.toLowerCase() &&
          transaction.email === verifyEmail
        ) {
          return transaction;
        }
      });
    }
  }

  public currentValue = 0;
  public maxValue = 0;
  public selectedValue = '0';

  public async increment() {
    const reg = new RegExp(
      '^-?([0]{1}.{1}[0-9]+|[1-9]{1}[0-9]*.{1}[0-9]+|[0-9]+|0)$'
    );

    if (!reg.test(this.selectedValue)) {
      this.selectedValue = '0';

      return;
    }
    const numberSelectedValue = Number(this.selectedValue);

    if (numberSelectedValue !== 0) {
      this.transactions.unshift({
        value: numberSelectedValue,
        date: this.formatDate(new Date()),
        email: await this.storage.get('email'),
        cryptoType: 'BTC',
      });

      this.selectedValue = '0';

      this.storage.set('transactions', this.transactions);
    }
  }

  onClick() {
    this.selectedValue = '';
  }

  formatDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}
