import { Component } from '@angular/core';
import { LengthUnitList } from '../../../../core/models/length-units-list';
import { StorageDataType } from '../../../../shared/models/storage-data-type';
import { CalculatedResult } from '../../../../shared/models/calculated-result';
import { ConvertFormValue } from '../../../../shared/models/convert-form-value';
import { MockUnitConversionService } from '../../services/mock-unit-conversion.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { DateService } from '../../../../shared/services/date.service';
import { StorageItemKey } from '../../../../shared/models/enums.model';

@Component({
  selector: 'bxc-unit-converter',
  templateUrl: './unit-converter.component.html',
  styleUrl: './unit-converter.component.scss',
})
export class UnitConverterComponent {
  constructor(
    private convertService: MockUnitConversionService,
    private storageService: StorageService,
    private dateSerivce: DateService
  ) {}
  loading = false;
  LengthUnitList = LengthUnitList;
  storageRecord!: StorageDataType;
  calculatedRes!: CalculatedResult | null;

  handleConversion(event: ConvertFormValue) {
    this.loading = true;
    this.calculatedRes = null;
    const { amount, from, to } = event;
    this.convertService
      .getData(from)
      .subscribe(res => {
        //finding the object based on the from key
        const rateObj = this.convertService.processData(from, res);
        // get the rateValue for calculattion
        let rateValue = rateObj.exchange_rates[to];
        let calculatedValue = +(amount * rateValue).toFixed(5);
        this.calculatedRes = { ...event, calculatedValue, ...rateObj };
        this.storageHandler();
      })
      .add(() => {
        this.loading = false
      });
  }

  storageHandler() {
    const storageRecord = {
      currentTime: this.dateSerivce.getCurrentTime(':'),
      currentDate: this.dateSerivce.getCurrentDate('/'),
      ...this.calculatedRes,
    } as StorageDataType;
    this.setStorage(storageRecord);
  }

  setStorage(storageRecord: StorageDataType) {
    this.storageService.setDataToSignal(
      StorageItemKey.LengthConversionHistory,
      storageRecord
    );
  }

  handleSwithc(evnet: boolean) {
    this.calculatedRes = null;
  }
}
