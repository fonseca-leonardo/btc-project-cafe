import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoincardComponent } from '../components/coincard/coincard.component';
import { CoinitemComponent } from '../components/coinitem/coinitem.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule],
  exports: [CoincardComponent, CoinitemComponent],
  declarations: [CoincardComponent, CoinitemComponent],
})
export class ComponentsModule {}
