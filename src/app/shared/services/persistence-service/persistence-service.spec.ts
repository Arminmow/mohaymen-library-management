import { TestBed } from '@angular/core/testing';
import { PersistenceService } from './persistence-service';

describe('PersistenceService', () => {
  let service: PersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersistenceService],
    });
    service = TestBed.inject(PersistenceService);

    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem');
    spyOn(localStorage, 'removeItem');
  });

  it('should save value to localStorage WHEN save is called', () => {
    service.save('testKey', { foo: 'bar' });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'testKey',
      JSON.stringify({ foo: 'bar' })
    );
  });

  it('should return parsed value WHEN get is called with existing key', () => {
    (localStorage.getItem as jasmine.Spy).and.returnValue(
      JSON.stringify({ foo: 'bar' })
    );

    const result = service.get<{ foo: string }>('testKey');

    expect(localStorage.getItem).toHaveBeenCalledWith('testKey');
    expect(result).toEqual({ foo: 'bar' });
  });

  it('should return null WHEN get is called with missing key', () => {
    (localStorage.getItem as jasmine.Spy).and.returnValue(null);

    const result = service.get('missingKey');

    expect(localStorage.getItem).toHaveBeenCalledWith('missingKey');
    expect(result).toBeNull();
  });

  it('should remove item from localStorage WHEN remove is called', () => {
    service.remove('testKey');

    expect(localStorage.removeItem).toHaveBeenCalledWith('testKey');
  });
});
