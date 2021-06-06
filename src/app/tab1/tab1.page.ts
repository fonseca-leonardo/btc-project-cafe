import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserService } from '../service/user.service';

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
      coinName: 'ETHEREUM',
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
      coinName: 'ETHEREUM',
      price: 13504,
      trending: 'down',
    },
  ];

  constructor(
    private storage: Storage,
    private router: Router,
    private userService: UserService
  ) {}
  async ngOnInit(): Promise<void> {
    const oldToken = await this.storage.get('token');

    if (oldToken !== '') {
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

  navigate(to: string) {
    this.router.navigate(['tabs/tab1/' + to]);
  }

  navigateToCryptoChart(coinName: string) {
    this.router.navigate(['tabs/tab3/detail/' + coinName]);
  }
}
