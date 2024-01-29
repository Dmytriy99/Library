import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from 'src/app/service/api.service';
import { of, throwError } from 'rxjs';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getData']);
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        FormsModule,
        MatInputModule,
        MatIconModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call apiService.getData on onSearch', fakeAsync(() => {
    const formValue = { book: 'exampleBook' };
    const testData = { works: ['book1', 'book2'] };
    apiService.getData.and.returnValue(of(testData));

    component.onSearch({ value: formValue } as any);
    tick();

    // Assert
    expect(apiService.getData).toHaveBeenCalledWith('exampleBook');
    expect(component.book).toEqual(testData.works);
    expect(component.error).toBe('');
  }));

  it('should handle error on apiService.getData on onSearch', fakeAsync(() => {
    const formValue = { book: 'exampleBook' };
    apiService.getData.and.returnValue(throwError({ status: 404 }));

    component.onSearch({ value: formValue } as any);
    tick();

    expect(apiService.getData).toHaveBeenCalledWith('exampleBook');
    expect(component.book).toBeUndefined();
    expect(component.error).toBe(
      'You must input a type of book or this type is invalid'
    );
  }));
});
