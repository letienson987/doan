import MenuPage from "../../support/pages/MenuPage";

describe("Food Modal Component Unit Tests", () => {
  beforeEach(() => {
    MenuPage.visit();
    MenuPage.clickMenuItem(0); // Mo modal
  });

  it("should display modal with correct structure", () => {
    // Kiem tra modal duoc hien thi voi cau truc dung
    MenuPage.verifyModalVisible();
    MenuPage.getModalTitle().should("be.visible");
    MenuPage.getCloseButton().should("be.visible");
    MenuPage.getNutritionButton().should("be.visible");
    MenuPage.getRecipeButton().should("be.visible");
  });

  it("should have correct modal styling", () => {
    // Kiem tra styling modal dung
    cy.get("#foodModal").should("have.css", "position", "fixed");
    cy.get("#foodModal").should("have.css", "z-index", "1000");
    cy.get("#foodModal").should("have.css", "background-color", "rgba(0, 0, 0, 0.8)");
  });

  it("should have correct modal content styling", () => {
    // Kiem tra styling noi dung modal dung
    cy.get(".modal-content").should("have.css", "background-color", "rgb(255, 255, 255)");
    cy.get(".modal-content").should("have.css", "border-radius", "15px");
    cy.get(".modal-content").should("have.css", "max-width", "800px");
  });

  it("should display nutrition view by default", () => {
    // Kiem tra mac dinh hien thi view dinh duong
    MenuPage.verifyNutritionViewActive();
    cy.get("#nutritionInfo").should("be.visible");
    cy.get("#recipeInfo").should("not.be.visible");
  });

  it("should switch to recipe view when recipe button clicked", () => {
    // Kiem tra chuyen sang view cong thuc khi click nut cong thuc
    MenuPage.switchToRecipeView();
    MenuPage.verifyRecipeViewActive();
    cy.get("#recipeInfo").should("be.visible");
    cy.get("#nutritionInfo").should("not.be.visible");
  });

  it("should have correct table structure for nutrition", () => {
    // Kiem tra cau truc bang dinh duong dung
    cy.get("#nutritionTableBody").should("exist");
    cy.get("#nutritionTableBody tr").should("have.length.greaterThan", 0);
    cy.get("#nutritionTableBody tr:first-child td").should("have.length", 3);
  });

  it("should have correct table structure for recipe", () => {
    MenuPage.switchToRecipeView();
    cy.get("#recipeTableBody").should("exist");
    cy.get("#recipeTableBody tr").should("have.length.greaterThan", 0);
    cy.get("#recipeTableBody tr:first-child td").should("have.length", 3);
  });

  it("should have correct button styling", () => {
    MenuPage.getNutritionButton().should("have.class", "active");
    MenuPage.getRecipeButton().should("not.have.class", "active");

    MenuPage.switchToRecipeView();
    MenuPage.getRecipeButton().should("have.class", "active");
    MenuPage.getNutritionButton().should("not.have.class", "active");
  });

  it("should close modal when close button clicked", () => {
    MenuPage.closeModal();
    MenuPage.verifyModalClosed();
  });

  it("should close modal when clicking outside", () => {
    cy.get("#foodModal").click("topLeft");
    MenuPage.verifyModalClosed();
  });

  it("should prevent body scroll when modal is open", () => {
    cy.get("body").should("have.css", "overflow", "hidden");
  });

  it("should restore body scroll when modal is closed", () => {
    MenuPage.closeModal();
    cy.get("body").should("have.css", "overflow", "auto");
  });
});