import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositPage } from '../pages/deposit/deposit.page';
import { ExchangePage } from '../pages/exchange/exchange.page';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'deposit',
    component: DepositPage,
  },
  {
    path: 'exchange',
    component: ExchangePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1PageRoutingModule {}
