import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CoversionServiceResponse } from '../../../shared/models/coversion-service-response';

@Injectable()

export class ExchangeRatesService {
  constructor(public http: HttpClient) {}

  public getExchangeRates(
    fromCurrency: string,
    toCurrency: string
  ): Observable<CoversionServiceResponse> {
    return this.http.get<CoversionServiceResponse>(
      `${environment.exchangeRatesAPIUrl}&base=${fromCurrency}&target=${toCurrency}`
    );
  }
}
