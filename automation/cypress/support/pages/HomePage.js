class HomePage {

  visit() {
    cy.visit("/");
  }

  // cac phan tu cua banner swiper
  getSwiperContainer() {
    return cy.get(".swiper-container");
  }

  getSwiperSlides() {
    return cy.get(".swiper-slide");
  }

  getSwiperNextButton() {
    return cy.get(".swiper-button-next");
  }

  getSwiperPrevButton() {
    return cy.get(".swiper-button-prev");
  }

  getSwiperPagination() {
    return cy.get(".swiper-pagination");
  }

  // Navigation elements - cac phan tu dieu huong
  getNavMenu() {
    return cy.get(".rd-navbar-nav");
  }

  getNavLink(linkText) {
    return cy.contains(".rd-nav-link", linkText);
  }

  getLogo() {
    return cy.get(".brand img");
  }

  // cac hanh dong
  navigateToMenu() {
    this.getNavLink("Thực Đơn").click();
  }

  navigateToTroLy() {
    this.getNavLink("Trợ Lý").click();
  }

  navigateToContact() {
    this.getNavLink("Liên Hệ").click();
  }

  navigateToHome() {
    this.getNavLink("Home").click();
  }

  // Banner interactions
  clickNextSlide() {
    this.getSwiperNextButton().click();
  }

  clickPrevSlide() {
    this.getSwiperPrevButton().click();
  }

  // Assertions
  verifyBannerVisible() {
    this.getSwiperContainer().should("be.visible");
    this.getSwiperSlides().should("have.length", 5);
  }

  verifyNavigationVisible() {
    this.getNavMenu().should("be.visible");
  }

  verifyLogoVisible() {
    this.getLogo().should("be.visible").and("have.attr", "src", "images/logo_rm_noname.png");
  }

  verifySlideContent(slideIndex, title, description) {
    // Chi kiem tra existence thay vi visibility do animation
    cy.contains(title).should("exist");
    cy.contains(description).should("exist");
  }

  // Kiem tra background images
  verifyBackgroundImages() {
    // Kiem tra co it nhat 3 div co background image
    cy.get("div[style*='background-image']").should("have.length.at.least", 3);
  }
}

export default new HomePage();