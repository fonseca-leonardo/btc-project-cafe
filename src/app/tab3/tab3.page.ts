import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  public chartOptions: ChartOptions = {};

  public btcChartData: ChartDataSets[] = [
    {
      data: [],
      label: '',
    },
  ];

  public ethChartData: ChartDataSets[] = [
    {
      data: [],
      label: '',
    },
  ];

  public ltcChartData: ChartDataSets[] = [
    {
      data: [],
      label: '',
    },
  ];

  public btcChartColor: Color[] = [
    {
      backgroundColor: 'rgba(255,255,0,0.2)',
      borderColor: 'rgba(255,255,0,1)',
      pointBackgroundColor: 'rgba(255,255,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
  ];

  public ethChartColor: Color[] = [
    {
      backgroundColor: 'rgba(255,0,255,0.2)',
      borderColor: 'rgba(255,0,255,1)',
      pointBackgroundColor: 'rgba(255,0,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
  ];

  public ltcChartColor: Color[] = [
    {
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
    },
  ];

  private mockData = [
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
  ];

  public chartType: ChartType = 'line';

  public chartLabels: Label[] = [];

  constructor(
    private router: Router,
    private storage: Storage,
    private userService: UserService
  ) {
    this.loadData();
  }
  async ngOnInit(): Promise<void> {
    const oldToken = await this.storage.get('token');

    if (oldToken) {
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

  loadData() {
    this.mockData.forEach((data) => {
      const date: Date = new Date(data.date);

      this.chartLabels.push(
        `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      );

      this.btcChartData[0].data.push(data.value);
      this.ethChartData[0].data.push(data.value);
      this.ltcChartData[0].data.push(data.value);
    });
  }

  navigateToCryptoChart(coinName: string) {
    this.router.navigate(['tabs/tab3/detail/' + coinName]);
  }
}
