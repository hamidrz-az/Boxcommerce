import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ExchangeRatesService } from './exchange-rates.service';
import { environment } from '../../../../environments/environment';
import { CoversionServiceResponse } from '../../../shared/models/coversion-service-response';

describe('ExchangeRatesService', () => {
  let service: ExchangeRatesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExchangeRatesService],
    });
    service = TestBed.inject(ExchangeRatesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getExchangeRates', () => {
    it('should return exchange rates data for given currencies', () => {
      const fromCurrency = 'USD';
      const toCurrency = 'EUR';
      const mockResponse: CoversionServiceResponse = {
        base: 'USD',
        last_updated: 1713014100,
        exchange_rates: {
          EUR: 0.938791,
        },
      };

      service.getExchangeRates(fromCurrency, toCurrency).subscribe((data) => {
        expect(data).toEqual(mockResponse);
      });

      const expectedUrl = `${environment.exchangeRatesAPIUrl}&base=${fromCurrency}&target=${toCurrency}`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');

      req.flush(mockResponse);
    });

    it('should handle errors gracefully', () => {
      const fromCurrency = 'USD';
      const toCurrency = 'EUR';

      service.getExchangeRates(fromCurrency, toCurrency).subscribe(
        (data) => fail('should have failed with the error'),
        (error) => {
          expect(error).toBeTruthy();
          // Add more expectations based on error handling logic
        }
      );

      const expectedUrl = `${environment.exchangeRatesAPIUrl}&base=${fromCurrency}&target=${toCurrency}`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');

      // Simulate error response
      req.error(new ErrorEvent('network error'));
    });
  });
});
