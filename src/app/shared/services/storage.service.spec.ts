import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';
import { StorageDataType } from '../models/storage-data-type';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setDataToSignal', () => {
    it('should add new data to the storage signal', () => {
      const key = 'testKey';
      const update: StorageDataType = { id: 1, name: 'Test Data' } as any;

      // Get the initial values of the storage signal
      const initialValues = service.storageData();

      // Call the method to add new data
      service.setDataToSignal(key, update);

      // Get the updated values of the storage signal
      const updatedValues = service.storageData();

      // Expect that the updated values contain the new data
      expect(updatedValues).toContain(update);

      // Expect that the updated values array length has increased by 1
      expect(updatedValues.length).toEqual(initialValues.length + 1);
    });
  });
});
