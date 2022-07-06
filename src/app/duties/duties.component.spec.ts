import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { DutiesComponent } from './duties.component';

describe('DutiesComponent', () => {
  let component: DutiesComponent;
  let fixture: ComponentFixture<DutiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      declarations: [DutiesComponent],
      providers: [TranslateService],
    }).compileComponents();

    fixture = TestBed.createComponent(DutiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
