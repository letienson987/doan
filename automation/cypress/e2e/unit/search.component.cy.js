import MenuPage from "../../support/pages/MenuPage";

describe("Search Component Unit Tests", () => {
  beforeEach(() => {
    MenuPage.visit();
  });

  it("should display search input with correct attributes", () => {
    MenuPage.getSearchInput().should("be.visible");
    MenuPage.getSearchInput().should("have.attr", "type", "text");
    MenuPage.getSearchInput().should("have.attr", "placeholder", "Tìm kiếm món ăn...");
  });

  it("should have correct search input styling", () => {
    MenuPage.getSearchInput().should("have.css", "border-radius", "8px");
    MenuPage.getSearchInput().should("have.css", "padding");
  });

  it("should accept text input", () => {
    const testText = "Cháo bí đỏ";
    MenuPage.searchForFood(testText);
    MenuPage.getSearchInput().should("have.value", testText);
  });

  it("should clear search input", () => {
    MenuPage.searchForFood("test");
    MenuPage.searchForFood("");
    MenuPage.getSearchInput().should("have.value", "");
  });

  it("should filter menu items based on search", () => {
    MenuPage.searchForFood("Cháo");
    MenuPage.getMenuItems().each(($item) => {
      cy.wrap($item).should("contain", "Cháo");
    });
  });

  it("should show no results for non-existent search", () => {
    MenuPage.searchForFood("xyz_nonexistent_food");
    MenuPage.getMenuItems().should("have.length", 0);
  });

  it("should be case insensitive", () => {
    MenuPage.searchForFood("CHÁO");
    MenuPage.getMenuItems().should("have.length.greaterThan", 0);
  });

  it("should work with partial matches", () => {
    MenuPage.searchForFood("bí");
    MenuPage.getMenuItems().each(($item) => {
      cy.wrap($item).should("contain", "bí");
    });
  });

  it("should reset results when search is cleared", () => {
    MenuPage.searchForFood("Cháo");
    MenuPage.searchForFood("");
    MenuPage.verifyMenuItemsCount(6);
  });

  it("should combine with filters", () => {
    MenuPage.filterByAge("7-12");
    MenuPage.searchForFood("Cháo");

    MenuPage.getMenuItems().should("have.length.greaterThan", 0);
    MenuPage.getMenuItems().each(($item) => {
      cy.wrap($item).should("contain", "Cháo");
      cy.wrap($item).should("contain", "7 tháng - 1 tuổi");
    });
  });
});