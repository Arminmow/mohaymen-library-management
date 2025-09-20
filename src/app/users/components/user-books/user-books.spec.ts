import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { UserBooksComponent } from './user-books.component';
import { BookStore, Book } from '../../../books/stores/book-store';
import { UsersStore, User } from '../../stores/users.store';
import { of, BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BOOK_STORE } from '../../../books/stores/book-store-abstraction';
import { USER_STORE } from '../../stores/user-store-abstraction';

describe('UserBooks', () => {
  let component: UserBooksComponent;
  let fixture: ComponentFixture<UserBooksComponent>;
  let mockBookStore: jasmine.SpyObj<BookStore>;
  let mockUserStore: jasmine.SpyObj<UsersStore>;

  const user1: User = { id: 1, name: 'Armin', age: 25, role: 'writer' };
  const user2: User = { id: 2, name: 'Ati', age: 24, role: 'writer' };

  const booksMap = new Map<number, Book[]>();
  booksMap.set(1, [
    {
      id: 1,
      title: 'Book A',
      author_id: 1,
      publishedDate: new Date('2020-01-01'),
      author: 'armin',
    },
    {
      id: 3,
      title: 'Book C',
      author_id: 1,
      publishedDate: new Date('2022-03-10'),
      author: 'armin',
    },
  ]);
  booksMap.set(2, [
    {
      id: 2,
      title: 'Book B',
      author_id: 2,
      publishedDate: new Date('2021-05-15'),
      author: 'mamad',
    },
  ]);

  let contextUserSubject: BehaviorSubject<User | null>;

  beforeEach(async () => {
    contextUserSubject = new BehaviorSubject<User | null>(null);

    mockUserStore = jasmine.createSpyObj('UsersStore', [], {
      contextUser$: contextUserSubject.asObservable(),
    });

    mockBookStore = jasmine.createSpyObj('BookStore', [], {
      booksByAuthor$: of(booksMap),
    });

    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [UserBooksComponent],
      providers: [
        { provide: BOOK_STORE, useValue: mockBookStore },
        { provide: USER_STORE, useValue: mockUserStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit books for contextUser', fakeAsync(() => {
    contextUserSubject.next(user1);
    component.ngOnInit();
    let emittedBooks: Book[] | undefined;
    component.books$.subscribe((books) => (emittedBooks = books));
    tick();
    expect(emittedBooks).toEqual(booksMap.get(user1.id));
  }));

  it('should update books when contextUser changes', fakeAsync(() => {
    component.ngOnInit();
    contextUserSubject.next(user1);
    tick();
    let emittedBooks: Book[] | undefined;
    component.books$.subscribe((books) => (emittedBooks = books));
    tick();
    expect(emittedBooks).toEqual(booksMap.get(user1.id));

    contextUserSubject.next(user2);
    tick();
    component.books$.subscribe((books) => (emittedBooks = books));
    tick();
    expect(emittedBooks).toEqual(booksMap.get(user2.id));
  }));

  it('should render book titles and dates in the template', fakeAsync(() => {
    contextUserSubject.next(user1);
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    const listItems = fixture.debugElement.queryAll(By.css('li.book-item'));
    expect(listItems.length).toBe(2);
    expect(listItems[0].nativeElement.textContent).toContain('Book A');
    expect(listItems[0].nativeElement.textContent).toContain('Jan 1, 2020');
    expect(listItems[1].nativeElement.textContent).toContain('Book C');
    expect(listItems[1].nativeElement.textContent).toContain('Mar 10, 2022');
  }));

  it('should display "No books found" if there are no books', fakeAsync(() => {
    contextUserSubject.next({
      id: 3,
      name: 'NoBooksUser',
      age: 20,
      role: 'writer',
    });
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    const noBooksEl = fixture.debugElement.query(By.css('p.no-books'));
    expect(noBooksEl).toBeTruthy();
    expect(noBooksEl.nativeElement.textContent).toContain(
      'No books found for this author.'
    );
  }));
});
