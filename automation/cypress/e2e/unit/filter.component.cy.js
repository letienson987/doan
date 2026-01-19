import MenuPage from "../../support/pages/MenuPage";

describe("Filter Component Unit Tests", () => {
  beforeEach(() => {
    MenuPage.visit();
  });

  it("should display age filter buttons", () => {
    MenuPage.getAgeFilterButtons().should("have.length", 4);
    MenuPage.getAgeFilterButtons().eq(0).should("contain", "Tất cả");
    MenuPage.getAgeFilterButtons().eq(1).should("contain", "7 tháng - 1 tuổi");
    MenuPage.getAgeFilterButtons().eq(2).should("contain", "1 - 2 tuổi");
    MenuPage.getAgeFilterButtons().eq(3).should("contain", "2 tuổi trở lên");
  });

  it("should display meal filter buttons", () => {
    MenuPage.getMealFilterButtons().should("have.length", 3);
    MenuPage.getMealFilterButtons().eq(0).should("contain", "Tất cả");
    MenuPage.getMealFilterButtons().eq(1).should("contain", "Bữa trưa");
    MenuPage.getMealFilterButtons().eq(2).should("contain", "Bữa tối");
  });

  it("should have correct default active states", () => {
    MenuPage.verifyFilterActive("age", "all");
    MenuPage.verifyFilterActive("meal", "all");
  });

  it("should change active state when age filter clicked", () => {
    MenuPage.filterByAge("7-12");
    MenuPage.verifyFilterActive("age", "7-12");
    MenuPage.getAgeFilterButtons().eq(0).should("not.have.class", "active");
  });

  it("should change active state when meal filter clicked", () => {
    MenuPage.filterByMeal("lunch");
    MenuPage.verifyFilterActive("meal", "lunch");
    MenuPage.getMealFilterButtons().eq(0).should("not.have.class", "active");
  });

  it("should have correct filter button styling", () => {
    cy.get(".filter-btn.active").should("have.css", "background-color");
    cy.get(".filter-btn.active").should("have.css", "color", "rgb(255, 255, 255)");
    cy.get(".filter-btn.active").should("have.css", "border-color");
  });

  it("should maintain active state for multiple filters", () => {
    MenuPage.filterByAge("7-12");
    MenuPage.filterByMeal("lunch");

    MenuPage.verifyFilterActive("age", "7-12");
    MenuPage.verifyFilterActive("meal", "lunch");
  });

  it("should reset to all when all filter clicked", () => {
    MenuPage.filterByAge("7-12");
    MenuPage.filterByAge("all");

    MenuPage.verifyFilterActive("age", "all");
  });
});