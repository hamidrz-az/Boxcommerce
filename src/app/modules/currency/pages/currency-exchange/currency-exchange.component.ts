import { Component } from '@angular/core';
import { ExchangeRatesService } from '../../services/exchange-rates.service';
import { ConvertFormValue } from '../../../../shared/models/convert-form-value';

import { StorageService } from '../../../../shared/services/storage.service';
import { CurrenciesList } from '../../../../core/models/currencies-list';
import { StorageDataType } from '../../../../shared/models/storage-data-type';
import { DateService } from '../../../../shared/services/date.service';
import { StorageItemKey } from '../../../../shared/models/enums.model';
import { CoversionServiceResponse } from '../../../../shared/models/coversion-service-response';
import { CalculatedResult } from '../../../../shared/models/calculated-result';

@Component({
  selector: 'bxc-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrl: './currency-exchange.component.scss',
})
export class CurrencyExchangeComponent {
  constructor(
    private exchangeService: ExchangeRatesService,
    private storageService: StorageService,
    private dateSerivce: DateService
  ) {}
  loading = false;
  currenciesList = CurrenciesList;
  storageRecord!: StorageDataType;
  exchangeRes!: CoversionServiceResponse;
  calculatedRes!: CalculatedResult | null;

  handleExchange(evnet: ConvertFormValue) {
    this.loading = true;
    this.calculatedRes = null;
    const { amount, from, to } = evnet;
    this.exchangeService
      .getExchangeRates(from, to)
      .subscribe((res: CoversionServiceResponse) => {
        // get the rateValue for calculattion
        let rate = res.exchange_rates[to];
        let calculatedValue = +(amount * rate).toFixed(5);
        this.calculatedRes = { amount, to, calculatedValue, ...res };
        this.storageHandler();
      })
      .add(() => {
        this.loading = false;
      });
  }

  storageHandler() {
    if (this.calculatedRes) {
      const storageRecord = {
        amount: this.calculatedRes.amount,
        from: this.calculatedRes.base,
        to: this.calculatedRes.to,
        currentTime: this.dateSerivce.getCurrentTime(':'),
        currentDate: this.dateSerivce.getCurrentDate('/'),
        calculatedValue: this.calculatedRes.calculatedValue,
      } as StorageDataType;
      this.setStorage(storageRecord);
    }
  }

  setStorage(storageRecord: StorageDataType) {
    this.storageService.setDataToSignal(
      StorageItemKey.ExchangeHistory,
      storageRecord
    );
  }

  handleSwithc(evnet: boolean) {
    this.calculatedRes = null;
  }
}
