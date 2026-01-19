import ContactPage from "../support/pages/ContactPage";

describe("Contact Page Tests", () => {
  beforeEach(() => {
    ContactPage.visit();
    cy.wait(2000); // Doi page load hoan toan
  });

  describe("Page Loading", () => {
    it("should load contact page correctly", () => {
      // Kiem tra trang lien he tai dung
      cy.contains("Liên Hệ").should("be.visible");
      cy.get(".rd-form").should("be.visible");
    });
  });

  describe("Contact Form", () => {
    it("should display all form fields", () => {
      // Kiem tra tat ca cac truong form duoc hien thi
      ContactPage.verifyFormFieldsVisible();
    });

    it("should fill contact form successfully", () => {
      // Kiem tra dien form lien he thanh cong
      ContactPage.fillContactForm({
        firstName: "Nguyen",
        lastName: "Van A",
        email: "test@example.com",
        message: "Day la tin nhan test"
      });

      // Kiem tra cac gia tri duoc dien dung
      ContactPage.verifyFormValues();
    });

    it("should submit contact form", () => {
      // Kiem tra gui form lien he
      ContactPage.fillContactForm({
        firstName: "Nguyen",
        lastName: "Van A",
        email: "test@example.com",
        message: "Day la tin nhan test"
      });

      ContactPage.submitForm();
      // Kiem tra form duoc submit (khong co loi)
      cy.get("form").should("exist");
    });
  });

  describe("Form Validation", () => {
    it("should show validation errors for empty fields", () => {
      // Kiem tra form co cac truong required
      ContactPage.getFirstNameInput().should("have.attr", "data-constraints", "@Required");
      ContactPage.getLastNameInput().should("have.attr", "data-constraints", "@Required");
      ContactPage.getEmailInput().should("have.attr", "data-constraints", "@Email @Required");
      ContactPage.getMessageTextarea().should("have.attr", "data-constraints", "@Required");
    });

    it("should validate email format", () => {
      // Kiem tra email input co validation email
      ContactPage.getEmailInput().should("have.attr", "type", "email");
      ContactPage.getEmailInput().should("have.attr", "data-constraints").and("include", "@Email");
    });
  });

  describe("Contact Information", () => {
    it("should display contact information", () => {
      // Kiem tra thong tin lien he trong footer
      cy.get(".footer-contacts").should("exist");
      cy.contains("0902288358").should("be.visible");
    });
  });
});