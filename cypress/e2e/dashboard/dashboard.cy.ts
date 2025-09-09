describe('Dashboard Sidebar (integration)', () => {
  beforeEach(() => {
    cy.visit('/'); 
  });

  it('should display the sidebar with logo', () => {
    cy.get('.logo').should('contain.text', 'ArminMow');
  });

  it('should have 2 menu items: Users and Books', () => {
    cy.get('ul[nz-menu] li[nz-menu-item]').should('have.length', 2);

    cy.get('ul[nz-menu] li[nz-menu-item]').eq(0).should('contain.text', 'Users');
    cy.get('ul[nz-menu] li[nz-menu-item]').eq(1).should('contain.text', 'Books');
  });

  it('should navigate to Users page when clicking Users', () => {
    cy.contains('Users').click();
    cy.url().should('include', '/users');
  });

  it('should navigate to Books page when clicking Books', () => {
    cy.contains('Books').click();
    cy.url().should('include', '/books');
  });
});
