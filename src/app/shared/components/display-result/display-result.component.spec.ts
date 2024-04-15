import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisplayResultComponent } from './display-result.component';

describe('DisplayResultComponent', () => {
  let component: DisplayResultComponent;
  let fixture: ComponentFixture<DisplayResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayResultComponent]
    })
    .compileComponents();
  });

  const mockResult = {
    amount: 100,
    base: 'USD',
    calculatedValue: 110.5,
    to: 'EUR'
  };

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayResultComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('calculatedRes', mockResult);
    fixture.detectChanges();
  });

  it('should display the calculated result', () => {
    
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const baseTitle = compiled.querySelector('.base_title');
    const destTitle = compiled.querySelector('.dest_title');

    expect(baseTitle.textContent).toContain(`${mockResult.amount} ${mockResult.base}`);
    expect(destTitle.textContent).toContain(`${mockResult.calculatedValue} ${mockResult.to}`);
  });
});
