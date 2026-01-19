import TroLyPage from "../support/pages/TroLyPage";

describe("Tro Ly Page Tests", () => {
  beforeEach(() => {
    TroLyPage.visit();
    cy.wait(2000); // Doi page load hoan toan
  });

  describe("Page Loading", () => {
    it("should load tro ly page correctly", () => {
      // Kiem tra trang tro ly tai dung
      TroLyPage.verifyPageLoaded();
    });
  });

  describe("Page Content", () => {
    it("should display page title and description", () => {
      // Kiem tra tieu de va mo ta
      TroLyPage.verifyWelcomeMessage();
    });

    it("should display chatbot image and link", () => {
      // Kiem tra hinh anh va link chatbot
      TroLyPage.verifyChatbotElementsVisible();
    });

    it("should display features list", () => {
      // Kiem tra danh sach tinh nang
      TroLyPage.verifyFeaturesListed();
    });

    it("should display disclaimer", () => {
      // Kiem tra luu y
      TroLyPage.verifyDisclaimerPresent();
    });
  });

  describe("Navigation", () => {
    it("should open chatbot in new tab", () => {
      // Kiem tra mo chatbot trong tab moi
      TroLyPage.getChatbotLink().should("have.attr", "target", "_blank");
      TroLyPage.getChatbotLink().should("have.attr", "href")
        .and("include", "dialogflow.com");
    });
  });
});