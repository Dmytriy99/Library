import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BookComponent } from './book.component';
import { ApiService } from 'src/app/service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let mockActivatedRoute: any;
  let mockApiService: any;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => 'mockedId',
        },
      },
    };

    mockApiService = {
      getKey: () =>
        of({
          title: 'Mocked Title',
          description: {
            value: 'Mocked Description',
          },
        }),
    };

    TestBed.configureTestingModule({
      declarations: [BookComponent],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        HttpClientModule,
        MatIconModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ApiService, useValue: mockApiService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties on ngOnInit', () => {
    component.ngOnInit();

    expect(component.key).toEqual('mockedId');
    expect(component.title).toEqual('Mocked Title');
    expect(component.description).toEqual('Mocked Description');
  });
});
