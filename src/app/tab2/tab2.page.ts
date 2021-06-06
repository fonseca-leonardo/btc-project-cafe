import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserData, UserService } from '../service/user.service';

interface Transaction {
  value: number;
  date: string;
  userData: UserData;
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
    const userData = await this.userService
      .getUserName(await this.storage.get('token'))
      .toPromise();
    if (
      storageTransaction.userData.userReturn.email === userData.userReturn.email
    ) {
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
        await this.storage.remove('token');
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

    this.filterTransactions();
  }

  public async refresh() {
    this.filterTransactions();
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

  public async increment() {
    if (this.selectedValue !== 0) {
      this.transactions.unshift({
        value: this.selectedValue,
        date: this.formatDate(new Date()),
        userData: await this.userService
          .getUserName(await this.storage.get('token'))
          .toPromise(),
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
