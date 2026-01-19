export const waitForLoading = () => {
  cy.get(".loading", { timeout: 10000 }).should("not.exist");
};

export const clickByText = (text) => {
  cy.contains("button", text).click();
};

export const fillInputByLabel = (label, value) => {
  cy.contains("label", label)
    .parent()
    .find("input")
    .clear()
    .type(value);
};
