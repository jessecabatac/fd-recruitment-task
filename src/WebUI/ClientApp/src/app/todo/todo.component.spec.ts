import { TodoComponent } from './todo.component';
import { FormBuilder } from '@angular/forms';

describe('TodoComponent addTag', () => {
  let component: TodoComponent;

  beforeEach(() => {
    const listsClient = {} as any;
    const itemsClient = {} as any;
    const modalService = {} as any;
    const fb = new FormBuilder();

    component = new TodoComponent(listsClient, itemsClient, modalService, fb);
    spyOn(component, 'updateItem');
  });

  it('should initialize tags array if undefined and add new tag', () => {
    // Arrange
    const item: any = { newTag: 'urgent' };

    // Act
    component.addTag(item);

    // Assert
    expect(item.tags).toEqual(['urgent']);
    expect(item.newTag).toBe('');
    expect(component.updateItem).toHaveBeenCalledWith(item);
  });

  it('should not add tag if newTag is empty', () => {
    // Arrange
    const item: any = { tags: [], newTag: '' };

    // Act
    component.addTag(item);

    // Assert
    expect(item.tags).toEqual([]);
    expect(component.updateItem).not.toHaveBeenCalled();
  });

  it('should not add tag if tag already exists', () => {
    // Arrange
    const item: any = { tags: ['urgent'], newTag: 'urgent' };

    // Act
    component.addTag(item);

    // Assert
    expect(item.tags).toEqual(['urgent']);
    expect(component.updateItem).not.toHaveBeenCalled();
  });

  it('should trim whitespace from newTag before adding', () => {
    // Arrange
    const item: any = { tags: [], newTag: '  important  ' };

    // Act
    component.addTag(item);

    // Assert
    expect(item.tags).toEqual(['important']);
    expect(item.newTag).toBe('');
    expect(component.updateItem).toHaveBeenCalledWith(item);
  });
});
