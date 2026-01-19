class TroLyPage {

  visit() {
    cy.visit("/troly.html");
  }

  // cac phan tu cua trang
  getPageTitle() {
    return cy.contains("Trợ lý ảo AI thông thái");
  }

  getChatbotImage() {
    return cy.get("img[alt='Biểu tượng trợ lý dinh dưỡng']");
  }

  getChatbotLink() {
    return cy.contains("Trò Chuyện Với Trợ Lý Ngay");
  }

  getFeaturesList() {
    return cy.get("ul li");
  }

  getDisclaimer() {
    return cy.contains("Lưu ý: Trợ lý AI đã được tham khảo qua ý kiến bác sĩ");
  }

  getChatbotContainer() {
    return cy.get(".chatbot-container");
  }

  getMessageInput() {
    return cy.get(".message-input");
  }

  getSendButton() {
    return cy.get(".send-button");
  }

  getChatMessages() {
    return cy.get(".chat-message");
  }

  // Actions - cac hanh dong
  openChatbot() {
    this.getChatbotLink().invoke("removeAttr", "target").click();
  }

  sendMessage(message) {
    this.getMessageInput().type(message);
    this.getSendButton().click();
  }

  // Assertions - cac ham xac nhan
  verifyPageLoaded() {
    cy.contains("Trợ Lý").should("be.visible");
    this.getPageTitle().should("be.visible");
  }

  verifyChatbotElementsVisible() {
    this.getChatbotImage().should("be.visible");
    this.getChatbotLink().should("be.visible");
  }

  verifyWelcomeMessage() {
    cy.contains("Trợ Lý AI Dinh Dưỡng Cho Trẻ").should("be.visible");
  }

  verifyFeaturesListed() {
    cy.contains("Tư vấn về thực đơn phù hợp theo độ tuổi").should("be.visible");
    cy.contains("Gợi ý công thức nấu ăn bổ dưỡng").should("be.visible");
    cy.contains("Cung cấp thông tin về giá trị dinh dưỡng").should("be.visible");
    cy.contains("Giải đáp thắc mắc về các vấn đề ăn uống").should("be.visible");
  }

  verifyDisclaimerPresent() {
    cy.contains("Lưu ý: Trợ lý AI đã được tham khảo qua ý kiến bác sĩ").should("be.visible");
  }

  verifyResponseReceived() {
    this.getChatMessages().should("have.length.greaterThan", 1);
  }

  verifyNutritionResponse() {
    this.getChatMessages().last().should("contain", "dinh dưỡng");
  }

  verifyMealSuggestion() {
    this.getChatMessages().last().should("contain", "bữa");
  }

  verifyResponsiveLayout() {
    this.getChatbotContainer().should("be.visible");
  }

  verifyChatHistory() {
    this.getChatMessages().should("have.length.greaterThan", 2);
  }

  verifyChatbotLinkWorks() {
    this.getChatbotLink().should("have.attr", "href")
      .and("include", "console.dialogflow.com");
  }
}

export default new TroLyPage();