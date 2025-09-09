describe('Add Book with Author Flow', () => {
  const addAuthor = (author: { name: string; age: string; role: string }) => {
    cy.visit('/users');
    cy.contains('Add User').click();

    cy.get('input[formControlName="name"]', { timeout: 10000 })
      .should('be.visible')
      .as('nameInput');

    cy.get('@nameInput')
      .click()
      .clear({ force: true })
      .type(author.name, { delay: 50 })
      .should('have.value', author.name);

    cy.get('nz-input-number[formControlName="age"] input')
      .as('ageInput')
      .clear({ force: true })
      .type(author.age, { delay: 50 })
      .should('have.value', author.age);

    cy.get('nz-select[formControlName="role"] .ant-select-selector').click();
    cy.get('.ant-select-item-option').contains(author.role).click();

    cy.get('button.submit-btn').should('not.be.disabled').click();

    cy.get('nz-table tbody tr').contains(author.name).should('exist');
  };

  const addBook = (book: {
    title: string;
    author: string;
    publishedDate: string;
    tags: string[];
  }) => {
    cy.visit('/books');
    cy.contains('Add Book').click();

    cy.get('input[formControlName="title"]', { timeout: 10000 })
      .should('be.visible')
      .as('titleInput');

    cy.get('@titleInput')
      .click()
      .clear({ force: true })
      .type(book.title, { delay: 50 })
      .should('have.value', book.title);

    cy.get(
      'nz-select[formControlName="author_info"] .ant-select-selector'
    ).click();
    cy.get('.ant-select-item-option').contains(book.author).click();

    cy.get('nz-date-picker[formControlName="publishedDate"] input')
      .click()
      .clear()
      .type(`${book.publishedDate}{enter}`);

    cy.get('nz-select[formControlName="tags"] .ant-select-selector').click();
    book.tags.forEach((tag) => {
      cy.get('.ant-select-item-option').contains(tag).click();
    });

    cy.get('body').type('{esc}');

    cy.get('button.submit-btn').should('not.be.disabled').click();

    cy.get('nz-table tbody tr').contains(book.title).should('exist');
  };

  it('should add a new author and then add a book with that author and show books for that author', () => {
    const author = { name: 'Ati', age: '22', role: 'writer' };
    const book = {
      title: 'My Book',
      author: 'Ati',
      publishedDate: '2025-09-09',
      tags: ['psychology', 'historical'],
    };

    addAuthor(author);
    addBook(book);

    cy.visit('/users');
    cy.get('nz-table tbody tr').contains('Ati').rightclick();
    cy.get('ul[nz-menu]').should('be.visible');
    cy.get('ul[nz-menu] li').contains('Show Books').click();

    cy.get('app-user-books').should('be.visible');
    cy.get('app-user-books .books-list .book-item .book-title').should(
      'contain.text',
      'My Book'
    );
  });
});
