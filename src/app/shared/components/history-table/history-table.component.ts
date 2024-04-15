import { Component, OnInit, ViewChild, computed, inject } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'bxc-history-table',
  templateUrl: './history-table.component.html',
  styleUrl: './history-table.component.scss',
})
export class HistoryTableComponent {
  displayedColumns = ['time', 'amount', 'from', 'to', 'calculatedValue'];
  storageService = inject(StorageService);
  myData = computed(() => {
    return this.storageService.storageData();
  });
}
