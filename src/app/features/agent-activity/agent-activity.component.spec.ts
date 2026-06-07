import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentActivityComponent } from './agent-activity.component';

describe('AgentActivityComponent', () => {
  let component: AgentActivityComponent;
  let fixture: ComponentFixture<AgentActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
