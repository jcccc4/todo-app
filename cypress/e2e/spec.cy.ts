describe('My First Test', () => {
  it('clicking "type" navigates to a new url', () => {
    cy.visit('/')

    cy.contains('Sign in').click() 

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should('include', '/login')
  })
})

describe('My First Test', () => {
  it('clicking "type" navigates to a new url', () => {
    cy.visit('/')

    cy.contains('Sign in').click() 

    // Should be on a new URL which
    // includes '/commands/actions'
    
    cy.get('#loginId').type('jcsacra4@gmail.com')
    cy.get('#loginPassword').type('1234qwer12') // 
    cy.contains('Login').click() 
    cy.url().should('include', '/dashboard')
  })
})