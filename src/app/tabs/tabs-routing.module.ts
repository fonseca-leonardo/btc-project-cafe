import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () =>
          import('../tab1/tab1.module').then((m) => m.Tab1PageModule),
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab1/tab1.module').then((m) => m.Tab1PageModule),
          },
          {
            path: 'exchange',
            loadChildren: () =>
              import('../pages/exchange/exchange.module').then(
                (m) => m.ExchangePageModule
              ),
          },
          {
            path: 'deposit',
            loadChildren: () =>
              import('../pages/deposit/deposit.module').then(
                (m) => m.DepositPageModule
              ),
          },
          {
            path: 'tab3/detail/:crypto',
            loadChildren: () =>
              import('../pages/detail/detail.module').then(
                (m) => m.DetailPageModule
              ),
          },
        ],
      },
      {
        path: 'tab2',
        loadChildren: () =>
          import('../tab2/tab2.module').then((m) => m.Tab2PageModule),
      },
      {
        path: 'tab3',
        loadChildren: () =>
          import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
          },
          {
            path: 'detail/:crypto',
            loadChildren: () =>
              import('../pages/detail/detail.module').then(
                (m) => m.DetailPageModule
              ),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/(one:one)',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
