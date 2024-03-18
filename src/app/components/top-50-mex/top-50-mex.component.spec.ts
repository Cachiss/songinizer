import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top50MexComponent } from './top-50-mex.component';

describe('Top50MexComponent', () => {
  let component: Top50MexComponent;
  let fixture: ComponentFixture<Top50MexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Top50MexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Top50MexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
