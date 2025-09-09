describe('Users Module (integration)', () => {
  const openAddBookModal = () => {
    cy.contains('Add Book').click();
    cy.get('app-add-book-form form.book-form', { timeout: 10000 }).should(
      'exist'
    );
  };

  const openContextMenu = () => {
    cy.get('nz-table tbody tr').first().rightclick();
    cy.get('ul[nz-menu]').should('be.visible');
  };

  beforeEach(() => {
    cy.visit('/books');
  });

  describe('UI elements', () => {
    it('should display Users Table title', () => {
      cy.get('h1').should('contain.text', 'Books Table');
    });

    it('should display Add User button', () => {
      cy.contains('Add Book').should('be.visible');
    });

    it('should display users table with headers', () => {
      ['Title', 'Author', 'Published Date', 'Tags'].forEach((text, i) => {
        cy.get('nz-table thead th').eq(i).should('contain.text', text);
      });
    });

    it('should display at least one row in the table', () => {
      cy.get('nz-table tbody tr').its('length').should('be.gte', 1);
    });
  });

  describe('Add book form', () => {
    it('should open Add Book modal and display form fields', () => {
      openAddBookModal();

      cy.get('input[formControlName="title"]').should('exist');
      cy.get('nz-select[formControlName="author_info"]').should('exist');
      cy.get('nz-date-picker[formControlName="publishedDate"]').should('exist');
      cy.get('nz-select[formControlName="tags"]').should('exist');

      cy.get('button.submit-btn').should('exist').and('be.disabled');
    });
  });

  describe('Context menu', () => {
    it('should show custom context menu when right-clicking a table row', () => {
      openContextMenu();
      ['Edit', 'Delete'].forEach((item) => {
        cy.get('ul[nz-menu] li').contains(item).should('exist');
      });
    });

    it('should open Edit Book modal when clicking Edit', () => {
      openContextMenu();
      cy.get('ul[nz-menu] li .edit-btn').click();
      cy.get('app-edit-book-form', { timeout: 10000 }).should('exist');
    });

    it('should display correct fields in Edit Book form', () => {
      openContextMenu();
      cy.get('ul[nz-menu] li .edit-btn').click();

      cy.get('app-edit-book-form form.book-form', { timeout: 10000 }).should(
        'exist'
      );

      cy.get('input[formControlName="title"]').should('exist');

      cy.get('nz-select[formControlName="author_info"]').should('exist');

      cy.get('nz-date-picker[formControlName="publishedDate"]').should('exist');

      cy.get('nz-select[formControlName="tags"]').should('exist');
    });

    it('should show delete confirmation when clicking Delete in context menu', () => {
      openContextMenu();

      cy.get('ul[nz-menu] li').contains('Delete').click();

      cy.get('.ant-modal-confirm')
        .should('be.visible')
        .within(() => {
          cy.get('.ant-modal-confirm-title').should(
            'contain.text',
            'Are you sure you want to delete'
          );
          cy.contains('Yes').should('exist');
          cy.contains('No').should('exist');
        });

      cy.get('.ant-modal-confirm').contains('No').click();
      cy.get('.ant-modal-confirm').should('not.exist');
    });

    it('should remove the first user row when confirming Delete', () => {
      cy.get('nz-table tbody tr').first().as('firstRow');

      cy.get('@firstRow').rightclick();
      cy.get('ul[nz-menu]').should('be.visible');

      cy.get('ul[nz-menu] li').contains('Delete').click();
      cy.get('.ant-modal-confirm').contains('Yes').click();

      cy.get('@firstRow').should('contain.text', 'No Data');
    });
  });
});
