# Test Scripts Documentation

## Test Structure

### Unit Tests (`cypress/unit/`)
Chứa các test component nhỏ lẻ, tập trung vào testing từng component riêng biệt:

- `swiper.component.cy.js` - Test component Swiper/Banner
- `modal.component.cy.js` - Test component Modal hiển thị thông tin món ăn
- `filter.component.cy.js` - Test component Filter (độ tuổi, bữa ăn)
- `search.component.cy.js` - Test component Search
- `pagination.component.cy.js` - Test component Pagination
- `navigation.component.cy.js` - Test component Navigation

### E2E Tests (`cypress/e2e/`)
Chứa các test scenario hoàn chỉnh, test flow từ đầu đến cuối:

- `banner.cy.js` - Test toàn bộ banner với navigation và responsive
- `menu.cy.js` - Test toàn bộ trang menu với filtering, search, modal
- `navigation.cy.js` - Test navigation giữa các trang
- `responsive.cy.js` - Test responsive design trên các viewport

## Page Object Model (POM)

Các page objects được tổ chức trong `cypress/support/pages/`:

- `HomePage.js` - Page object cho trang chủ
- `MenuPage.js` - Page object cho trang thực đơn
- `ContactPage.js` - Page object cho trang liên hệ
- `TroLyPage.js` - Page object cho trang trợ lý

## Running Tests

```bash
# Run all tests
npm test

# Run only E2E tests
npm run test:e2e

# Run only unit tests
npm run test:unit

# Open Cypress UI for E2E tests
npm run test:open:e2e

# Open Cypress UI for unit tests
npm run test:open:unit
```

## Test Categories

### Unit Tests
- Test cấu trúc và styling của components
- Test interactions cơ bản
- Test data attributes và properties
- Test visual states (active, disabled, etc.)

### E2E Tests
- Test user journeys hoàn chỉnh
- Test integration giữa các components
- Test business logic và workflows
- Test responsive behavior
- Test performance và loading

## Contract Tests

Hiện tại chưa có contract tests vì ứng dụng không có API backend. Trong tương lai có thể thêm:

- API contract tests nếu có backend
- Component contract tests với mock data
- Visual regression tests