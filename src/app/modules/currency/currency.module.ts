import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyRoutingModule } from './currency-routing.module';
import { CurrencyExchangeComponent } from './pages/currency-exchange/currency-exchange.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    CurrencyExchangeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CurrencyRoutingModule
  ]
})
export class CurrencyModule { }
