import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-coinitem',
  templateUrl: './coinitem.component.html',
  styleUrls: ['./coinitem.component.scss'],
})
export class CoinitemComponent implements OnInit {
  @Input()
  private coinImage: string;

  @Input()
  private coinName: string;

  @Input()
  private trending: 'up' | 'down';

  @Input()
  private coinPrice: number;

  constructor() {}

  ngOnInit() {}

  parseToCurrency(value: number) {
    const formatter = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
    return formatter.format(value);
  }
}
