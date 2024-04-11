import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    // ValidationMessageDirective,
  ],
})
export class SharedModule {}
