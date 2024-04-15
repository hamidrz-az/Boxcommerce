import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConverterFormComponent } from './converter-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';

describe('ConverterFormComponent', () => {
  let component: ConverterFormComponent;
  let fixture: ComponentFixture<ConverterFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConverterFormComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIcon,
        BrowserAnimationsModule
      ],
      providers: [MatSnackBar]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConverterFormComponent);
    component = fixture.componentInstance;
    // Provide dummy values for inputs
    fixture.componentRef.setInput('loading', false);
    fixture.componentRef.setInput('listOptions', ['USD', 'EUR', 'GBP']);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid initially', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be valid with correct values', () => {
    const amountCtrl = component.form.controls['amount'];
    const fromCtrl = component.form.controls['from'];
    const toCtrl = component.form.controls['to'];

    amountCtrl.setValue(100);
    fromCtrl.setValue('USD');
    toCtrl.setValue('EUR');

    expect(component.form.valid).toBeTruthy();
  });

  it('should emit onConvert when form is submitted', () => {
    spyOn(component.onConvert, 'emit');

    const amountCtrl = component.form.controls['amount'];
    const fromCtrl = component.form.controls['from'];
    const toCtrl = component.form.controls['to'];

    amountCtrl.setValue(100);
    fromCtrl.setValue('USD');
    toCtrl.setValue('EUR');

    component.exchangeRates();

    expect(component.onConvert.emit).toHaveBeenCalledWith({ amount: 100, from: 'USD', to: 'EUR' });
  });

  it('should switch "from" and "to" currencies', () => {
    spyOn(component.onSwitch, 'emit');

    const fromCtrl = component.form.controls['from'];
    const toCtrl = component.form.controls['to'];

    fromCtrl.setValue('USD');
    toCtrl.setValue('EUR');

    component.switchAction();

    expect(fromCtrl.value).toEqual('EUR');
    expect(toCtrl.value).toEqual('USD');
    expect(component.onSwitch.emit).toHaveBeenCalledWith(true);
  });

  it('should render the form elements', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('form')).toBeTruthy();
    expect(compiled.querySelector('mat-form-field')).toBeTruthy();
    expect(compiled.querySelector('mat-select')).toBeTruthy();
    expect(compiled.querySelector('input[type="number"]')).toBeTruthy();
    expect(compiled.querySelector('button[type="submit"]')).toBeTruthy();
    expect(compiled.querySelectorAll('button').length).toBe(3); // Check for both switch buttons
  });

  it('should disable submit button when form is invalid', () => {
    const compiled = fixture.debugElement;
    const submitButton = compiled.query(By.css('button[type="submit"]')).nativeElement;

    expect(submitButton.disabled).toBeTruthy();
  });

  it('should enable submit button when form is valid', () => {
    const compiled = fixture.nativeElement;
    const amountInput = compiled.querySelector('input[type="number"]');
    const fromSelect = compiled.querySelector('mat-select[formControlName="from"]');
    const toSelect = compiled.querySelector('mat-select[formControlName="to"]');
    const submitButton = compiled.querySelector('button[type="submit"]');
  
    amountInput.value = '100';
    amountInput.dispatchEvent(new Event('input'));
  
    fromSelect.value = 'USD';
    fromSelect.dispatchEvent(new Event('change'));
  
    toSelect.value = 'EUR';
    toSelect.dispatchEvent(new Event('change'));
  
    // Simulate loading being false
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
  
    expect(submitButton.disabled).toBeTruthy();
  });
});
