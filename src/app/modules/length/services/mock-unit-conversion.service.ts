import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class MockUnitConversionService {

  constructor(private http: HttpClient) { }

  public getData(form: string) {
    return this.http.get('assets/mock-data.json');
  }

  public processData(from: string, data: any) {
    // Perform filtering here
    return data.find((item: any) => item.base === from);
  }
}
