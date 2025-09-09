describe('Users Module (integration)', () => {
  beforeEach(() => {
    cy.visit('/users');
  });

  it('should display Users Table title', () => {
    cy.get('h1').should('contain.text', 'Users Table');
  });

  it('should display Add User button', () => {
    cy.contains('Add User').should('be.visible');
  });

  it('should open Add User modal and display the form', () => {
    // open modal
    cy.contains('Add User').click();

    // check the form exists
    cy.get('app-add-user-form form.user-form').should('exist');

    // check form fields
    cy.get('input[formControlName="name"]').should('exist');
    cy.get('nz-input-number[formControlName="age"]').should('exist');
    cy.get('nz-select[formControlName="role"]').should('exist');

    // check submit button is present and initially disabled
    cy.get('button.submit-btn').should('exist').and('be.disabled');
  });

  it('should fill the Add User form and enable the Submit button', () => {
    // Open the Add User modal
    cy.contains('Add User').click();

    // Fill Name input
    cy.get('input[formControlName="name"]', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type('John Doe')
      .should('have.value', 'John Doe');

    // Fill Age input (nz-input-number)
    cy.get('nz-input-number[formControlName="age"] input', { timeout: 10000 })
      .should('be.visible')
      .as('ageInput');

    cy.get('@ageInput').clear({ force: true });
    cy.get('@ageInput').type('30');
    cy.get('@ageInput').should('have.value', '30');

    // Select Role (nz-select)
    cy.get('nz-select[formControlName="role"] .ant-select-selector', {
      timeout: 10000,
    })
      .should('exist')
      .click();

    // Choose option from overlay
    cy.get('.ant-select-item-option', { timeout: 10000 })
      .contains('admin') // match actual role text in your app
      .click();

    // Verify selected role
    cy.get(
      'nz-select[formControlName="role"] .ant-select-selection-item'
    ).should('contain.text', 'admin');

    // Check that Submit button is now enabled
    cy.get('button.submit-btn', { timeout: 10000 })
      .should('exist')
      .and('not.be.disabled');
  });

  it('should display the users table with headers', () => {
    cy.get('nz-table thead th').eq(0).should('contain.text', 'Name');
    cy.get('nz-table thead th').eq(1).should('contain.text', 'Age');
    cy.get('nz-table thead th').eq(2).should('contain.text', 'Role');
  });

  it('should display at least one row in the table', () => {
    cy.get('nz-table tbody tr').its('length').should('be.gte', 1);
  });
});
