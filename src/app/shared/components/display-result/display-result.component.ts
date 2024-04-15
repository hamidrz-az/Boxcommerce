import { Component, input } from '@angular/core';
import { CalculatedResult } from '../../models/calculated-result';

@Component({
  selector: 'bxc-display-result',
  templateUrl: './display-result.component.html',
  styleUrl: './display-result.component.scss',
})
export class DisplayResultComponent {
  public calculatedRes = input.required<CalculatedResult>();
}
