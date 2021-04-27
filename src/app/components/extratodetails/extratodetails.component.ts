import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-extratodetails',
  templateUrl: './extratodetails.component.html',
  styleUrls: ['./extratodetails.component.scss'],
})
export class ExtratoDetailsComponent implements OnInit {
  @Input()
  coinImage: string;

  @Input()
  coinName: string;

  @Input()
  coinQTD: number;

  constructor() {}

  ngOnInit() {}
}
