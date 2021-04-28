import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoincardComponent } from '../components/coincard/coincard.component';
import { CoinitemComponent } from '../components/coinitem/coinitem.component';
import { ExtratoDetailsComponent } from '../components/extratodetails/extratodetails.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule],
  exports: [CoincardComponent, CoinitemComponent, ExtratoDetailsComponent],
  declarations: [CoincardComponent, CoinitemComponent, ExtratoDetailsComponent],
})
export class ComponentsModule {}
