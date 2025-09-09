describe('Users Module (integration)', () => {
  const openAddUserModal = () => {
    cy.contains('Add User').click();
    cy.get('app-add-user-form form.user-form', { timeout: 10000 }).should(
      'exist'
    );
  };

  const fillAddUserForm = (user: {
    name: string;
    age: string;
    role: string;
  }) => {
    // Name input
    cy.get('input[formControlName="name"]')
      .clear()
      .type(user.name)
      .should('have.value', user.name);

    // Age input
    cy.get('nz-input-number[formControlName="age"] input')
      .clear({ force: true })
      .type(user.age)
      .should('have.value', user.age);

    // Role select
    cy.get('nz-select[formControlName="role"] .ant-select-selector').click();
    cy.get('.ant-select-item-option').contains(user.role).click();
    cy.get(
      'nz-select[formControlName="role"] .ant-select-selection-item'
    ).should('contain.text', user.role);
  };

  const submitAddUserForm = () => {
    cy.get('button.submit-btn').should('not.be.disabled').click();
  };

  beforeEach(() => {
    cy.visit('/users');
  });

  describe('UI elements', () => {
    it('should display Users Table title', () => {
      cy.get('h1').should('contain.text', 'Users Table');
    });

    it('should display Add User button', () => {
      cy.contains('Add User').should('be.visible');
    });

    it('should display users table with headers', () => {
      const headers = ['Name', 'Age', 'Role'];
      headers.forEach((text, i) => {
        cy.get('nz-table thead th').eq(i).should('contain.text', text);
      });
    });

    it('should display at least one row in the table', () => {
      cy.get('nz-table tbody tr').its('length').should('be.gte', 1);
    });
  });

  describe('Add User form', () => {
    it('should open modal and display form fields', () => {
      openAddUserModal();

      cy.get('input[formControlName="name"]').should('exist');
      cy.get('nz-input-number[formControlName="age"]').should('exist');
      cy.get('nz-select[formControlName="role"]').should('exist');

      cy.get('button.submit-btn').should('exist').and('be.disabled');
    });

    it('should fill form and enable submit button', () => {
      openAddUserModal();
      fillAddUserForm({ name: 'John Doe', age: '30', role: 'admin' });

      cy.get('button.submit-btn').should('not.be.disabled');
    });

    it('should add a new user row to the table after submitting', () => {
      const user = { name: 'John Doe', age: '30', role: 'admin' };

      openAddUserModal();
      fillAddUserForm(user);
      submitAddUserForm();

      cy.get('nz-table tbody tr')
        .last()
        .within(() => {
          cy.get('td').eq(0).should('contain.text', user.name);
          cy.get('td').eq(1).should('contain.text', user.age);
          cy.get('td').eq(2).should('contain.text', 'Admin');
        });
    });
  });

  describe('Context menu', () => {
    it('should show custom context menu when right-clicking a table row', () => {
      // Right-click the first row in the table
      cy.get('nz-table tbody tr').first().rightclick();

      // The menu should now be visible
      cy.get('ul[nz-menu]').should('be.visible');

      // Check specific menu items
      cy.get('ul[nz-menu] li').contains('Edit').should('exist');
      cy.get('ul[nz-menu] li').contains('Delete').should('exist');

      // Optional: check a dynamic role item exists (replace with your roles)
      cy.get('ul[nz-menu] li').contains('Change role to User').should('exist');
      cy.get('ul[nz-menu] li').contains('Change role to Writer').should('exist');
    });
  });
});
