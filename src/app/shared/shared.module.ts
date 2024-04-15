import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { ConverterFormComponent } from './components/converter-form/converter-form.component';
import { HistoryTableComponent } from './components/history-table/history-table.component';
import { DisplayResultComponent } from './components/display-result/display-result.component';

@NgModule({
  declarations: [ConverterFormComponent, HistoryTableComponent, DisplayResultComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ConverterFormComponent,
    DisplayResultComponent,
    HistoryTableComponent
  ],
})
export class SharedModule {}
