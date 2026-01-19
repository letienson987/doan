import MenuPage from "../support/pages/MenuPage";

describe("Menu Page Tests", () => {
  beforeEach(() => {
    MenuPage.visit();
    cy.wait(2000); // Doi page load hoan toan
  });

  describe("Page Loading", () => {
    it("should load menu page correctly", () => {
      // Kiem tra trang menu tai dung
      cy.contains("Thực đơn dinh dưỡng cho bé").should("be.visible");
      cy.get(".menu-grid").should("be.visible");
    });
  });

  describe("Filter Functionality", () => {
    it("should display filter options", () => {
      // Kiem tra tuy chon loc duoc hien thi
      MenuPage.verifyFilterOptionsVisible();
    });

    it("should filter by age group", () => {
      // Kiem tra loc theo do tuoi
      MenuPage.filterByAge("7-12");
      MenuPage.verifyFilteredResults();
    });

    it("should filter by meal type", () => {
      // Kiem tra loc theo bua an
      MenuPage.filterByMealType("lunch");
      MenuPage.verifyFilteredResults();
    });
  });

  describe("Search Functionality", () => {
    it("should display search box", () => {
      // Kiem tra o tim kiem duoc hien thi
      MenuPage.verifySearchBoxVisible();
    });

    it("should search for menu items", () => {
      // Kiem tra tim kiem mon an
      MenuPage.searchForFood("Cháo");
      MenuPage.verifySearchResults();
    });
  });

  describe("Menu Items Display", () => {
    it("should display menu items", () => {
      // Kiem tra mon an duoc hien thi
      MenuPage.verifyMenuItemsVisible();
    });
  });

  describe("Modal Functionality", () => {
    it("should open modal when clicking menu item", () => {
      // Kiem tra mo modal khi click mon an
      MenuPage.openFirstMenuItem();
      MenuPage.verifyModalVisible();
    });

    it("should display nutrition information in modal", () => {
      // Kiem tra thong tin dinh duong trong modal
      MenuPage.openFirstMenuItem();
      MenuPage.verifyNutritionInfoVisible();
    });

    it("should switch to recipe view in modal", () => {
      // Kiem tra chuyen den che do cong thuc
      MenuPage.openFirstMenuItem();
      MenuPage.switchToRecipeView();
      MenuPage.verifyRecipeInfoVisible();
    });

    it("should close modal", () => {
      // Kiem tra dong modal
      MenuPage.openFirstMenuItem();
      MenuPage.closeModal();
      MenuPage.verifyModalClosed();
    });
  });

  describe("Pagination", () => {
    it("should navigate between pages", () => {
      // Kiem tra dieu huong giua cac trang
      MenuPage.navigateToPage(2);
      MenuPage.verifyPageNavigation();
    });
  });
});