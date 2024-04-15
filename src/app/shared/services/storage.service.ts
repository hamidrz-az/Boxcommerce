import { Injectable, signal } from '@angular/core';
import { StorageDataType } from '../models/storage-data-type';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public storageData = signal<StorageDataType[]>([]);
  constructor() {}

  //The key can be used to save distinct modules on the local storage independently
  setDataToSignal(key: string, update: StorageDataType) {
    this.storageData.update((values) => [...values, update]);
  }

}
