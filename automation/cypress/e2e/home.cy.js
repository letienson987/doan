import HomePage from "../support/pages/HomePage";

describe("Home Page Tests", () => {
  beforeEach(() => {
    HomePage.visit();
    cy.wait(2000); // Doi page load hoan toan
  });

  describe("Banner Functionality", () => {
    it("should display banner swiper correctly", () => {
      // Kiem tra banner swiper duoc hien thi
      HomePage.verifyBannerVisible();

      // Kiem tra cau hinh swiper
      HomePage.getSwiperContainer().should("have.attr", "data-loop", "true");
      HomePage.getSwiperContainer().should("have.attr", "data-autoplay", "5000");
    });

    it("should display navigation controls", () => {
      // Kiem tra cac nut dieu huong
      HomePage.getSwiperNextButton().should("be.visible");
      HomePage.getSwiperPrevButton().should("be.visible");
      HomePage.getSwiperPagination().should("exist");
    });

    it("should navigate between slides", () => {
      // Kiem tra dieu huong slide
      HomePage.clickNextSlide();
      cy.wait(1000); // Doi chuyen slide

      HomePage.clickPrevSlide();
      cy.wait(1000); // Doi chuyen slide
    });

    it("should display slide content correctly", () => {
      // Kiem tra noi dung slide 1
      HomePage.verifySlideContent(0, "Cheerful Meal", "Cheerful Meal là nền tảng");

      // Kiem tra noi dung slide 2
      HomePage.verifySlideContent(1, "Nutrition", "Bé ăn ngon, mẹ yên tâm");

      // Kiem tra noi dung slide 3
      HomePage.verifySlideContent(2, "Technology", "Hệ thống AI phân tích");
    });

    it("should load background images", () => {
      // Kiem tra co it nhat 3 slide
      HomePage.getSwiperSlides().should("have.length", 5);
    });
  });

  describe("Navigation", () => {
    it("should display navigation menu", () => {
      // Kiem tra menu dieu huong
      HomePage.verifyNavigationVisible();
    });

    it("should display logo", () => {
      // Kiem tra logo
      HomePage.verifyLogoVisible();
    });

    it("should navigate to menu page", () => {
      // Kiem tra dieu huong den trang menu
      HomePage.navigateToMenu();
      cy.url().should("include", "thucdon");
      cy.contains("Thực đơn dinh dưỡng cho bé").should("be.visible");
    });
  });

  describe("Page Elements", () => {
    it("should display main sections", () => {
      // Kiem tra cac phan tu chinh tren trang co ton tai
      cy.get(".section").should("have.length.at.least", 3);
      cy.get("h1").should("exist");
      cy.get("p").should("have.length.at.least", 5);
    });
  });
});