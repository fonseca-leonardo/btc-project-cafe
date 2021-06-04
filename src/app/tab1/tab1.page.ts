import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

interface ICoinsCardProps {
  backgroundColor: string;

  fontColor: string;

  coinImage: string;

  coinName: string;

  quantity: number;
}
interface ICoinsItemsProps {
  coinImage: string;

  coinName: string;

  price: number;

  trending: 'up' | 'down';
}
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  public userCoins: Array<ICoinsCardProps> = [
    {
      backgroundColor:
        'linear-gradient(180deg, #FFFFFF 0%, rgba(152, 9, 171, 0.99) 0.01%, #DEA9F1 82.81%)',
      fontColor: '#FFF',
      coinImage: '../../../assets/bitcoin-coincard.png',
      coinName: 'BITCOIN',
      quantity: 0.001351,
    },
    {
      backgroundColor: '#FFF',
      fontColor: '#303962',
      coinImage: '../../../assets/ethereum-coincard.png',
      coinName: 'ETHERIUM',
      quantity: 0.06624,
    },
  ];

  public coinItems: ICoinsItemsProps[] = [
    {
      coinImage: '../../../assets/bitcoin-coincard.png',
      coinName: 'BITCOIN',
      price: 365457,
      trending: 'up',
    },
    {
      coinImage: '../../../assets/ethereum-coincard.png',
      coinName: 'ETHERIUM',
      price: 13504,
      trending: 'down',
    },
  ];

  constructor(private storage: Storage, private router: Router) {}
  async ngOnInit(): Promise<void> {
    if (!(await this.storage.get('token'))) {
      this.router.navigate(['/']);
    }
  }

  navigate(to: string) {
    this.router.navigate(['tabs/tab1/' + to]);
  }

  navigateToCryptoChart(coinName: string) {
    this.router.navigate(['tabs/tab3/detail/' + coinName]);
  }
}
