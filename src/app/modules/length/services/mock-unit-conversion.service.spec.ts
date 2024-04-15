import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockUnitConversionService } from './mock-unit-conversion.service';

describe('MockUnitConversionService', () => {
  let service: MockUnitConversionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MockUnitConversionService]
    });
    service = TestBed.inject(MockUnitConversionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getData', () => {
    it('should retrieve data from the mock JSON file', () => {
      const form = 'someForm';

      service.getData(form).subscribe(data => {
        // Ensure that the data received is not empty
        expect(data).toBeTruthy();
        // Add more expectations based on the structure of your mock data
      });

      const req = httpMock.expectOne('assets/mock-data.json');
      expect(req.request.method).toBe('GET');

      // Simulate successful response
      req.flush({/* Mock response data */});
    });
  });

  describe('processData', () => {
    it('should filter and return data based on the "from" parameter', () => {
      const from = 'someValue';
      const mockData = [{ base: 'someValue', /* other properties */ }];

      const processedData = service.processData(from, mockData);

      expect(processedData).toEqual(mockData[0]);
    });

    it('should return undefined if no matching data is found', () => {
      const from = 'nonExistentValue';
      const mockData = [{ base: 'someValue', /* other properties */ }];

      const processedData = service.processData(from, mockData);

      expect(processedData).toBeUndefined();
    });
  });
});
