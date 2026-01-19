import HomePage from "../../support/pages/HomePage";

describe("Navigation Component Unit Tests", () => {
  beforeEach(() => {
    HomePage.visit();
  });

  it("should display navigation menu", () => {
    HomePage.verifyNavigationVisible();
  });

  it("should display all navigation links", () => {
    HomePage.getNavLink("Home").should("be.visible");
    HomePage.getNavLink("Thực Đơn").should("be.visible");
    HomePage.getNavLink("Trợ Lý").should("be.visible");
    HomePage.getNavLink("Liên Hệ").should("be.visible");
  });

  it("should have correct navigation link URLs", () => {
    HomePage.getNavLink("Home").should("have.attr", "href", "index.html");
    HomePage.getNavLink("Thực Đơn").should("have.attr", "href", "thucdon.html");
    HomePage.getNavLink("Trợ Lý").should("have.attr", "href", "troly.html");
    HomePage.getNavLink("Liên Hệ").should("have.attr", "href", "contact-us.html");
  });

  it("should display logo", () => {
    HomePage.verifyLogoVisible();
  });

  it("should have correct logo attributes", () => {
    HomePage.getLogo().should("have.attr", "src", "images/logo_rm_noname.png");
    HomePage.getLogo().should("have.attr", "alt");
  });

  it("should have mobile toggle button", () => {
    cy.get(".rd-navbar-toggle").should("exist");
  });

  it("should have correct navigation styling", () => {
    HomePage.getNavMenu().should("have.css", "display");
    cy.get(".rd-nav-item.active").should("exist");
  });

  it("should highlight active navigation item", () => {
    cy.get(".rd-nav-item.active").should("contain", "Home");
  });
});