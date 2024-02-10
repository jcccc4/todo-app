describe("Login", () => {
  it('clicking "type" navigates to a new url', () => {
    cy.visit("/");

    cy.contains("Sign in").click();

    // Should be on a new URL which
    // includes '/commands/actions'

    cy.get("#loginId").type("jcsacra4@gmail.com");
    cy.get("#loginPassword").type("1234qwer12"); //
    cy.contains("Login").click();
    cy.url().should("include", "/dashboard");
  });
});

describe("Add, edit and delete tasks ", () => {
  it('clicking "type" navigates to a new url', () => {
    cy.visit("/");

    cy.contains("Sign in").click();
    cy.get("#loginId").type("jcsacra4@gmail.com");
    cy.get("#loginPassword").type("1234qwer12"); //
    cy.contains("Login").click();
    cy.url().should("include", "/dashboard");

    cy.get("li").then(($input) => {
      const initialInputCount = $input.length;
      cy.get("#createTask").type("Notes{enter}");
      cy.get("li").should("have.length", initialInputCount + 1);
    });
    cy.get('input:not([type="hidden"])').last().type(" additional text").should("have.value", "Notes additional text")
    
  });
});
