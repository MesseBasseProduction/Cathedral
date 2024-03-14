import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeVariantToggleComponent } from './theme-variant-toggle.component';

describe('ThemeVariantToggleComponent', () => {
  let component: ThemeVariantToggleComponent;
  let fixture: ComponentFixture<ThemeVariantToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeVariantToggleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThemeVariantToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
