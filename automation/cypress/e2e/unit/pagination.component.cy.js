import MenuPage from "../../support/pages/MenuPage";

describe("Pagination Component Unit Tests", () => {
  beforeEach(() => {
    MenuPage.visit();
  });

  it("should display pagination buttons", () => {
    // Kiem tra cac nut phan trang duoc hien thi
    MenuPage.getPageButtons().should("have.length", 2);
    MenuPage.getPageButtons().eq(0).should("contain", "1");
    MenuPage.getPageButtons().eq(1).should("contain", "2");
  });

  it("should have first page active by default", () => {
    // Kiem tra trang dau tien active mac dinh
    MenuPage.verifyPageActive(1);
    MenuPage.getPageButtons().eq(0).should("have.class", "active");
  });

  it("should change active page when clicked", () => {
    // Kiem tra thay doi trang active khi click
    MenuPage.goToPage(2);
    MenuPage.verifyPageActive(2);
    MenuPage.getPageButtons().eq(1).should("have.class", "active");
    MenuPage.getPageButtons().eq(0).should("not.have.class", "active");
  });

  it("should navigate back to first page", () => {
    // Kiem tra quay lai trang dau
    MenuPage.goToPage(2);
    MenuPage.goToPage(1);
    MenuPage.verifyPageActive(1);
  });

  it("should have correct pagination styling", () => {
    // Kiem tra styling phan trang dung
    cy.get(".page-btn.active").should("have.css", "background-color");
    cy.get(".page-btn.active").should("have.css", "color", "rgb(255, 255, 255)");
  });

  it("should display different items on different pages", () => {
    // Kiem tra cac trang co noi dung khac nhau
    // Lay item dau tien tren trang 1
    let firstPageItem;
    MenuPage.getMenuItems().first().invoke("text").then((text) => {
      firstPageItem = text;
    });

    // Chuyen sang trang 2
    MenuPage.goToPage(2);

    // Kiem tra item dau tien khac nhau
    MenuPage.getMenuItems().first().invoke("text").should("not.equal", firstPageItem);
  });

  it("should maintain filter state when changing pages", () => {
    MenuPage.filterByAge("7-12");
    MenuPage.goToPage(2);
    // Kiem tra neu co item tren trang 2
    MenuPage.getMenuItems().should(($items) => {
      if ($items.length > 0) {
        cy.wrap($items).each(($item) => {
          cy.wrap($item).should("contain", "7 tháng - 1 tuổi");
        });
      }
    });
  });

  it("should maintain search state when changing pages", () => {
    MenuPage.searchForFood("Cháo");
    MenuPage.goToPage(2);

    // Kiem tra neu co item tren trang 2
    MenuPage.getMenuItems().should(($items) => {
      if ($items.length > 0) {
        cy.wrap($items).each(($item) => {
          cy.wrap($item).should("contain", "Cháo");
        });
      }
    });
  });
});