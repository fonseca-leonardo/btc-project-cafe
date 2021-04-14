import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoincardComponent } from '../components/coincard/coincard.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule],
  exports: [CoincardComponent],
  declarations: [CoincardComponent],
})
export class ComponentsModule {}
