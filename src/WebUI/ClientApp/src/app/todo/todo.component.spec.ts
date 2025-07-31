import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { FormsModule, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsModalService } from 'ngx-bootstrap/modal';

class BsModalServiceMock {}

describe('TodoComponent Color Picker', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoComponent],
      imports: [FormsModule, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        { provide: BsModalService, useClass: BsModalServiceMock },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;

    spyOn(component, 'ngOnInit').and.callFake(() => {});

    // Mock data
    component.lists = [
      {
        id: 1,
        title: 'Test List',
        items: [
          { id: 1, title: 'Test Item', done: false, color: '#ff0000', tags: [] }
        ]
      }
    ] as any;
    component.selectedList = component.lists[0];

    fixture.detectChanges();
  });

  it('should render color picker input for each todo item', () => {
    // Arrange / Act
    const colorInputs = fixture.debugElement.queryAll(By.css('input[type="color"]'));

    // Assert
    expect(colorInputs.length).toBe(component.selectedList.items.length);
    expect(colorInputs[0].nativeElement.value).toBe('#ff0000');
  });

  it('should update item.color when color picker value changes', () => {
    // Arrange
    const colorInputs = fixture.debugElement.queryAll(By.css('input[type="color"]'));

    // Act
    const colorInput = colorInputs[0].nativeElement;
    colorInput.value = '#00ff00';
    colorInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Assert
    expect(colorInputs.length).toBeGreaterThan(0);
    expect(component.selectedList.items[0].color).toBe('#00ff00');
  });

  it('should apply background color style to todo item', () => {
    // Arrange
    const listItems = fixture.debugElement.queryAll(By.css('li.list-group-item'));
    const todoItem = listItems.find(li =>
      li.nativeElement.textContent.includes('Test Item')
    );

    // Act
    const bgColor = todoItem.nativeElement.style.backgroundColor;

    // Assert
    expect(todoItem).toBeDefined();
    expect(bgColor === 'rgb(255, 0, 0)' || bgColor === '#ff0000').toBeTrue();
  });
});
