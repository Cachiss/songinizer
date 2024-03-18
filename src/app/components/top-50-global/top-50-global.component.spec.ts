import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top50GlobalComponent } from './top-50-global.component';

describe('Top50GlobalComponent', () => {
  let component: Top50GlobalComponent;
  let fixture: ComponentFixture<Top50GlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Top50GlobalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Top50GlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
