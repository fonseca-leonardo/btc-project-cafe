import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataSets, ChartType } from 'chart.js';
import { Label, Color } from 'ng2-charts';

interface ICrypto {
  name: string;

  currentValue: number;

  totalTrade: number;

  dataset: ChartDataSets[];

  color: Color[];
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public cryptoName: 'ETHEREUM' | 'BITCOIN' | 'LITECOIN';

  public chartLabels: Label[] = [];

  public currentCrypto: ICrypto = {
    name: '',
    currentValue: 0,
    totalTrade: 0,
    dataset: [
      {
        data: [],
        label: ''
      }
    ],
    color: [
    ],
  };

  public color: Color[];

  public chartType: ChartType = 'line';

  public cryptos: {[x:string]: {
    name: string;
    currentValue: number;
    totalTrade: number;
    chart: {
        data: Array<{value: number; date: string}>;
        color: {
            backgroundColor: string;
            borderColor: string;
            pointBackgroundColor: string;
            pointBorderColor: string;
            pointHoverBackgroundColor: string;
            pointHoverBorderColor: string;
        }[];
    };
  }} = {
    ETHEREUM: {
      name: 'Ethereum',
      currentValue: 12964.13,
      totalTrade: 153.1,
      chart: {
        data: [
          {
            value: 25464.75,
            date: '2021-03-29T21:37:29.000Z',
          },
          {
            value: 24575.28,
            date: '2021-03-30T21:37:29.000Z',
          },
          {
            value: 24894.64,
            date: '2021-03-31T21:37:29.000Z',
          },
          {
            value: 23999.14,
            date: '2021-04-01T21:37:29.000Z',
          },
          {
            value: 25475.28,
            date: '2021-04-02T21:37:29.000Z',
          },
          {
            value: 25375.24,
            date: '2021-04-03T21:37:29.000Z',
          },
          {
            value: 23647.84,
            date: '2021-04-04T21:37:29.000Z',
          },
          {
            value: 17586.84,
            date: '2021-04-05T21:37:29.000Z',
          },
          {
            value: 14234.40,
            date: '2021-04-06T21:37:29.000Z',
          },
          {
            value: 13801.73,
            date: '2021-04-07T21:37:29.000Z',
          },
          {
            value: 12940.33,
            date: '2021-04-08T21:37:29.000Z',
          }
        ],
        color: [{
          backgroundColor: 'rgba(255,0,255,0.2)',
          borderColor: 'rgba(255,0,255,1)',
          pointBackgroundColor: 'rgba(255,0,255,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        }],
      }
    },
    BITCOIN: {
      name: 'BitCoin',
      currentValue: 182146.47,
      totalTrade: 80.54,
      chart: {
        data: [
          {
            value: 333147.75,
            date: '2021-03-29T21:37:29.000Z',
          },
          {
            value: 339403.28,
            date: '2021-03-30T21:37:29.000Z',
          },
          {
            value: 331208.64,
            date: '2021-03-31T21:37:29.000Z',
          },
          {
            value: 335263.14,
            date: '2021-04-01T21:37:29.000Z',
          },
          {
            value: 336649.28,
            date: '2021-04-02T21:37:29.000Z',
          },
          {
            value: 325894.24,
            date: '2021-04-03T21:37:29.000Z',
          },
          {
            value: 332324.84,
            date: '2021-04-04T21:37:29.000Z',
          },
          {
            value: 230548.84,
            date: '2021-04-05T21:37:29.000Z',
          },
          {
            value: 200176.40,
            date: '2021-04-06T21:37:29.000Z',
          },
          {
            value: 164785.73,
            date: '2021-04-07T21:37:29.000Z',
          },
          {
            value: 200458.33,
            date: '2021-04-08T21:37:29.000Z',
          }
        ],
        color: [{
          backgroundColor: 'rgba(255,255,0,0.2)',
          borderColor: 'rgba(255,255,0,1)',
          pointBackgroundColor: 'rgba(255,255,0,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        }],
      }
    },
    LITECOIN: {
      name: 'LiteCoin',
      currentValue: 857.69,
      totalTrade: 1051.32,
      chart: {
        data: [
          {
            value: 1820.75,
            date: '2021-03-29T21:37:29.000Z',
          },
          {
            value: 1880.28,
            date: '2021-03-30T21:37:29.000Z',
          },
          {
            value: 2013.64,
            date: '2021-03-31T21:37:29.000Z',
          },
          {
            value: 1803.14,
            date: '2021-04-01T21:37:29.000Z',
          },
          {
            value: 1690.28,
            date: '2021-04-02T21:37:29.000Z',
          },
          {
            value: 1738.24,
            date: '2021-04-03T21:37:29.000Z',
          },
          {
            value: 1531.84,
            date: '2021-04-04T21:37:29.000Z',
          },
          {
            value: 1484.84,
            date: '2021-04-05T21:37:29.000Z',
          },
          {
            value: 1574.40,
            date: '2021-04-06T21:37:29.000Z',
          },
          {
            value: 999.73,
            date: '2021-04-07T21:37:29.000Z',
          },
          {
            value: 942.33,
            date: '2021-04-08T21:37:29.000Z',
          }
        ],
        color: [{
          backgroundColor: 'rgba(77,83,96,0.2)',
          borderColor: 'rgba(77,83,96,1)',
          pointBackgroundColor: 'rgba(77,83,96,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(77,83,96,1)',
        }],
      },
    },
  };

  constructor(private router: Router) {
    this.loadData();
  }

  ngOnInit() {

  }

  loadData() {
    const [,routeCrypto] = this.router.url.split('/tabs/tab3/detail/');

    this.currentCrypto.name = this.cryptos[routeCrypto].name;
    this.currentCrypto.currentValue = this.cryptos[routeCrypto].currentValue;
    this.currentCrypto.totalTrade = this.cryptos[routeCrypto].totalTrade;


    this.currentCrypto.color = this.cryptos[routeCrypto].chart.color;

    this.cryptos[routeCrypto].chart.data.forEach(el => {
      this.currentCrypto.dataset[0].data.push(el.value);

      const date: Date = new Date(el.date);
      this.chartLabels.push(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
    });
  }

  goBack() {
    this.router.navigate(['tabs/tab3']);
  }

  parseToCurrency(value: number) {
    const formatter = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
    return formatter.format(value);
  }  
}
