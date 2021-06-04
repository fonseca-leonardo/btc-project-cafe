import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Tab3Page } from './tab3.page';
import { DetailPage } from '../pages/detail/detail.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
  },
  {
    path: 'detail/:crypto',
    component: DetailPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab3PageRoutingModule {}
