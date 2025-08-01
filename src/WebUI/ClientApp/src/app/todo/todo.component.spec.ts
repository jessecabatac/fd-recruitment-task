import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { of, throwError } from 'rxjs';
import { TodoListsClient } from '../web-api-client';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, FormBuilder } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

class BsModalServiceMock {}


describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let mockListsClient: any;

  beforeEach(() => {
    mockListsClient = {
      get: jasmine.createSpy()
    };

    TestBed.configureTestingModule({
      declarations: [TodoComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        { provide: TodoListsClient, useValue: mockListsClient },
        { provide: BsModalService, useClass: BsModalServiceMock },
        FormBuilder
      ]
    });

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
  });

  it('should load and filter lists and items on init', () => {
    const mockResponse = {
      lists: [
        {
          isDeleted: false,
          items: [
            { isDeleted: false },
            { isDeleted: true }
          ]
        },
        {
          isDeleted: true,
          items: []
        }
      ],
      priorityLevels: ['High', 'Medium', 'Low']
    };

    mockListsClient.get.and.returnValue(of(mockResponse));

    component.ngOnInit();

    expect(component.lists.length).toBe(1);
    expect(component.lists[0].items.length).toBe(1);
    expect(component.selectedList).toBe(component.lists[0]);
  });
});
