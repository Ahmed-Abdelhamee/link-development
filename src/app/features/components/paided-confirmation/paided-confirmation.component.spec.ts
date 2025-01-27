import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidedConfirmationComponent } from './paided-confirmation.component';

describe('PaidedConfirmationComponent', () => {
  let component: PaidedConfirmationComponent;
  let fixture: ComponentFixture<PaidedConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaidedConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaidedConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
