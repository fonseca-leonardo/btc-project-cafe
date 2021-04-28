import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-extratodetails',
  templateUrl: './extratodetails.component.html',
  styleUrls: ['./extratodetails.component.scss'],
})
export class ExtratoDetailsComponent implements OnInit {
  @Input()
  cryptoType: string;

  @Input()
  date: string;

  @Input()
  value: number;

  constructor() {}

  ngOnInit() {}
}
