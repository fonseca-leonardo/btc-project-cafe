import { DomElementSchemaRegistry } from '@angular/compiler';
import { Component } from '@angular/core';

interface Transaction {
  value: number;
  date: Date;
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
  public coins: string[] = [
    'BTC Bitcoin',
    'ETH Etherium',
    'DGE DogeCoin',
    'LTC LiteCoin',
  ];

  public coinItems: coins[] = [
    {
      coinImage: '../../../assets/bitcoin-coincard.png',
      coinName: 'BITCOIN',
    },
    {
      coinImage: '../../../assets/ethereum-coincard.png',
      coinName: 'ETHERIUM',
    },
  ];

  public coinsFilter: string[] = this.coins;

  constructor() {}

  ngOnInit() {}

  public pesquisar(ev: CustomEvent) {
    let val = ev.detail.value;
    if (val && val.trim() !== '') {
      this.coinsFilter = this.coins.filter(
        (term) => term.toLocaleLowerCase().indexOf(val.toLowerCase()) > -1
      );
    } else this.coinsFilter = this.coins;
  }

  public currentValue = 0;
  public maxValue = 0;
  public selectedValue = 0;

  public transactions: Transaction[] = [
    // {
    //   value: 500,
    //   date: new Date(),
    // },
  ];

  public increment() {
    this.currentValue += this.selectedValue;
    this.maxValue = Math.max(this.maxValue, this.currentValue);

    this.transactions.push({
      value: this.selectedValue,
      date: new Date(),
    });

    this.selectedValue = 0;
  }
}
