import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LengthRoutingModule } from './length-routing.module';
import { UnitConverterComponent } from './pages/unit-converter/unit-converter.component';
import { SharedModule } from '../../shared/shared.module';
import { MockUnitConversionService } from './services/mock-unit-conversion.service';

@NgModule({
  declarations: [UnitConverterComponent],
  imports: [CommonModule, SharedModule, LengthRoutingModule],
  providers: [MockUnitConversionService],
})
export class LengthModule {}
