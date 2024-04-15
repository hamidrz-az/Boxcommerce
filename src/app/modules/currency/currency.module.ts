import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyRoutingModule } from './currency-routing.module';
import { CurrencyExchangeComponent } from './pages/currency-exchange/currency-exchange.component';
import { SharedModule } from '../../shared/shared.module';
import { ExchangeRatesService } from './services/exchange-rates.service';

@NgModule({
  declarations: [CurrencyExchangeComponent],
  imports: [CommonModule, SharedModule, CurrencyRoutingModule],
  providers: [ExchangeRatesService],
})
export class CurrencyModule {}
