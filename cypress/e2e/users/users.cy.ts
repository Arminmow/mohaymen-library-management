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

  it('should open Add User modal when button is clicked', () => {
    cy.contains('Add User').click();
    cy.get('app-add-user-form').should('exist');
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
