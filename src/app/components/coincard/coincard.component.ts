import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-coincard',
  templateUrl: './coincard.component.html',
  styleUrls: ['./coincard.component.scss'],
})
export class CoincardComponent implements OnInit {
  @Input()
  backgroundColor: string;

  @Input()
  fontColor: string;

  @Input()
  coinImage: string;

  @Input()
  coinName: string;

  @Input()
  quantity: string;

  constructor() {}

  ngOnInit() {}
}
