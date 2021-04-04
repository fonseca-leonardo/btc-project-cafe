import { DomElementSchemaRegistry } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  public coins: string[] = [
    'US Dolar',
    'BRL Real',
    'EUR Euro',
    'BTC Bitcoin',
    'ETH Etherium',
    'DGE DogeCoin',
  ];
  public coinsFilter: string[] = this.coins;

  constructor() {}

  ngOnInit() {}

  search(ev: CustomEvent) {
    let val = ev.detail.value;
    if (val && val.trim() !== '') {
      this.coinsFilter = this.coins.filter(
        (term) =>
          term.toLocaleLowerCase().indexOf(val.toLowerCase().trim()) > -1
      );
    } else this.coinsFilter = this.coins;
  }
}
