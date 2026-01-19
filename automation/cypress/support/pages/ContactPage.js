class ContactPage {

  visit() {
    cy.visit("/contact-us.html");
  }

  // ac phan tu cua form
  getFirstNameInput() {
    return cy.get("#contact-first-name");
  }

  getLastNameInput() {
    return cy.get("#contact-last-name");
  }

  getEmailInput() {
    return cy.get("#contact-email");
  }

  getMessageTextarea() {
    return cy.get("#contact-message");
  }

  getSubmitButton() {
    return cy.get("button[type='submit']");
  }

  // cac phan tu thong tin lien he
  getContactInfo() {
    return cy.get(".footer-contacts");
  }

  getPhoneNumber() {
    return cy.get(".link-phone");
  }

  getAddress() {
    return cy.get(".link-location").first();
  }

  getFacebookLink() {
    return cy.get(".link-location").last();
  }

  // cac hanh dong
  fillContactForm(data) {
    if (data.firstName) this.getFirstNameInput().type(data.firstName);
    if (data.lastName) this.getLastNameInput().type(data.lastName);
    if (data.email) this.getEmailInput().type(data.email);
    if (data.message) this.getMessageTextarea().type(data.message);
  }

  submitForm() {
    this.getSubmitButton().click();
  }

  // Assertions
  verifyPageLoaded() {
    cy.url().should("include", "contact-us");
    cy.contains("Liên Hệ").should("be.visible");
    cy.get(".rd-form").should("be.visible");
  }

  verifyFormFieldsVisible() {
    this.getFirstNameInput().should("be.visible");
    this.getLastNameInput().should("be.visible");
    this.getEmailInput().should("be.visible");
    this.getMessageTextarea().should("be.visible");
    this.getSubmitButton().should("be.visible");
  }

  verifyFormValues() {
    this.getFirstNameInput().should("have.value", "Nguyen");
    this.getLastNameInput().should("have.value", "Van A");
    this.getEmailInput().should("have.value", "test@example.com");
    this.getMessageTextarea().should("have.value", "Day la tin nhan test");
  }

  verifyValidationErrors() {
    // Kiem tra cac thong bao loi validation
    cy.get(".error-message").should("be.visible");
  }

  verifyEmailValidationError() {
    cy.contains("Email không hợp lệ").should("be.visible");
  }

  verifyContactInfo() {
    this.getPhoneNumber().should("contain", "0902288358");
    this.getAddress().should("contain", "Hà Nội - Việt Nam");
    this.getFacebookLink().should("contain", "FanPage: Cheerful Meal");
  }
}

export default new ContactPage();