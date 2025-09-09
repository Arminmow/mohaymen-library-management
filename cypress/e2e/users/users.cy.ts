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
});
