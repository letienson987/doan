class MenuPage {

  visit() {
    cy.visit("/thucdon.html");
  }

  //cac phan tu cua trang
  getPageTitle() {
    return cy.contains("Thực đơn dinh dưỡng cho bé");
  }

  getMenuGrid() {
    return cy.get(".menu-grid");
  }

  getMenuItems() {
    return cy.get(".menu-item");
  }

  // cac phan tu loc
  getAgeFilterButtons() {
    return cy.get(".filter-btn[data-age]");
  }

  getMealFilterButtons() {
    return cy.get(".filter-btn[data-meal]");
  }

  getSearchInput() {
    return cy.get("#searchInput");
  }

  // Pagination - phan trang
  getPageButtons() {
    return cy.get(".page-btn");
  }

  // cac phan tu cua modal
  getFoodModal() {
    return cy.get("#foodModal");
  }

  getModalTitle() {
    return cy.get("#foodModalTitle");
  }

  getNutritionButton() {
    return cy.get(".nutrition-btn");
  }

  getRecipeButton() {
    return cy.get(".recipe-btn");
  }

  getCloseButton() {
    return cy.get(".close-button");
  }

  getNutritionTable() {
    return cy.get("#nutritionTableBody");
  }

  getRecipeTable() {
    return cy.get("#recipeTableBody");
  }

  // Actions
  filterByAge(ageGroup) {
    cy.get(`.filter-btn[data-age="${ageGroup}"]`).click();
  }

  filterByMealType(mealType) {
    cy.get(`.filter-btn[data-meal="${mealType}"]`).click();
  }

  searchForFood(foodName) {
    if (foodName === "") {
      this.getSearchInput().clear();
    } else {
      this.getSearchInput().clear().type(foodName);
    }
  }

  clickMenuItem(index = 0) {
    this.getMenuItems().eq(index).click();
  }

  switchToNutritionView() {
    this.getNutritionButton().click();
  }

  switchToRecipeView() {
    this.getRecipeButton().click();
  }

  closeModal() {
    this.getCloseButton().click();
  }

  goToPage(pageNumber) {
    cy.get(`.page-btn[data-page="${pageNumber}"]`).click();
  }

  // Assertions
  verifyPageLoaded() {
    this.getPageTitle().should("be.visible");
    this.getMenuGrid().should("be.visible");
  }

  verifyFilterOptionsVisible() {
    cy.contains("Độ tuổi").should("be.visible");
    cy.contains("Bữa ăn").should("be.visible");
    cy.get(".filter-btn").should("have.length.greaterThan", 4);
  }

  verifySearchBoxVisible() {
    this.getSearchInput().should("be.visible").and("have.attr", "placeholder", "Tìm kiếm món ăn...");
  }

  verifyMenuItemsVisible() {
    this.getMenuItems().should("have.length", 6);
  }

  verifyFilteredResults() {
    this.getMenuItems().should("have.length.greaterThan", 0);
  }

  verifySearchResults() {
    this.getMenuItems().should("have.length.greaterThan", 0);
    this.getMenuItems().first().should("contain", "Cháo");
  }

  verifyModalVisible() {
    this.getFoodModal().should("be.visible");
    this.getModalTitle().should("not.be.empty");
  }

  verifyModalClosed() {
    this.getFoodModal().should("not.be.visible");
  }

  verifyNutritionInfoVisible() {
    this.getNutritionButton().should("have.class", "active");
    cy.get("#nutritionInfo").should("be.visible");
    this.getNutritionTable().find("tr").should("have.length.greaterThan", 0);
  }

  verifyRecipeInfoVisible() {
    this.getRecipeButton().should("have.class", "active");
    cy.get("#recipeInfo").should("be.visible");
    this.getRecipeTable().find("tr").should("have.length.greaterThan", 0);
  }

  verifyPageNavigation() {
    cy.get(".page-btn").contains("2").should("have.class", "active");
    this.getMenuItems().should("have.length.greaterThan", 0);
  }

  // Additional methods for new tests
  openFirstMenuItem() {
    this.clickMenuItem(0);
  }

  navigateToPage(pageNumber) {
    this.goToPage(pageNumber);
  }
}

export default new MenuPage();