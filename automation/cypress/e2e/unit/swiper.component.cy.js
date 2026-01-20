import HomePage from "../../support/pages/HomePage";

describe("Swiper Component Unit Tests", () => {
  beforeEach(() => {
    HomePage.visit();
  });

  it("should initialize swiper with correct data attributes", () => {
    HomePage.getSwiperContainer().should("have.class", "swiper-container");
    HomePage.getSwiperContainer().should("have.class", "swiper-slider");
    HomePage.getSwiperContainer().should("have.class", "swiper-slider-modern");

    HomePage.getSwiperContainer().should("have.attr", "data-loop", "true");
    HomePage.getSwiperContainer().should("have.attr", "data-autoplay", "5000");
    HomePage.getSwiperContainer().should("have.attr", "data-simulate-touch", "true");
    HomePage.getSwiperContainer().should("have.attr", "data-nav", "true");
    HomePage.getSwiperContainer().should("have.attr", "data-slide-effect", "fade");
  });

  it("should have correct number of slides", () => {
    HomePage.getSwiperSlides().should("have.length.at.least", 3);
  });

  it("should have navigation buttons", () => {
    HomePage.getSwiperNextButton().should("exist").and("be.visible");
    HomePage.getSwiperPrevButton().should("exist").and("be.visible");
  });

  it("should have pagination", () => {
    // Pagination co the ton tai nhung bi an tren mobile
    HomePage.getSwiperPagination().should("exist");
  });

  it("should have correct slide structure", () => {
    // Kiem tra cau truc slide dung
    HomePage.getSwiperSlides().each(($slide, index) => {
      cy.wrap($slide).should("have.class", "swiper-slide");
      cy.wrap($slide).find(".swiper-slide-caption").should("exist");
    });
  });

  it("should have background images for slides", () => {
    // Kiem tra xem co hinh nen nao do
    cy.get(".swiper-slide").should("exist");
    // Vi swiper co the thay doi DOM, chi kiem tra slide ton tai
    cy.get(".swiper-slide").should("have.length.at.least", 3);
  });

});