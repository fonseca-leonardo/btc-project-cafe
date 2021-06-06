import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-coinitem',
  templateUrl: './coinitem.component.html',
  styleUrls: ['./coinitem.component.scss'],
})
export class CoinitemComponent implements OnInit {
  @Input()
  public coinImage: string;

  @Input()
  public coinName: string;

  @Input()
  public trending: string;

  @Input()
  public coinPrice: string;

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
