import { Component, OnInit, input, output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConvertFormValue } from '../../models/convert-form-value';
import { MatSnackBar } from '@angular/material/snack-bar';

interface ConverterForm {
  amount: FormControl<number | null>;
  from: FormControl<string>;
  to: FormControl<string>;
}

@Component({
  selector: 'bxc-converter-form',
  templateUrl: './converter-form.component.html',
  styleUrl: './converter-form.component.scss',
})

export class ConverterFormComponent implements OnInit {
  loading = input.required<boolean>();
  public listOptions = input.required<string[]>();
  public form!: FormGroup<ConverterForm>;
  onConvert = output<ConvertFormValue>();
  onSwitch = output<boolean>();

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.initForm();
  }

  get toControl() {
    return this.form.get('to') as FormControl;
  }
  get fromControl() {
    return this.form.get('from') as FormControl;
  }

  initForm(): void {
    this.form = new FormGroup<ConverterForm>({
      amount: new FormControl<number | null>(null, {
        validators: [Validators.required, Validators.min(Number.MIN_VALUE)],
      }),
      from: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      to: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  exchangeRates() {
    const { value } = this.form;
    if (value.from !== value.to) {
      this.onConvert.emit(this.form.value as ConvertFormValue);
    } else {
      this.snackBar.open('Please choose a right conversion', 'Error');
    }
  }

  switchAction() {
    const { value } = this.form;
    this.form.controls.from.setValue(value.to as string);
    this.form.controls.to.setValue(value.from as string);
    this.onSwitch.emit(true);
  }
}
