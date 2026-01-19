# Cypress CI/CD với GitHub Actions

## Tổng quan

Repository này sử dụng GitHub Actions để tự động chạy Cypress tests khi có push hoặc pull request.

## Workflows

### 1. Cypress Tests (`cypress.yml`) - **WORKFLOW CHÍNH**
- **Trigger**:
  - Push trên branch `main` và `develop`
  - Pull Request trên branch `main` và `develop` (khi mở, update, reopen, ready for review)
  - **Không chạy trên draft PR**
- **Chức năng**:
  - Chạy **tất cả** Cypress tests (Unit + E2E) trên Node.js 18 và 20
  - Tạo báo cáo test summary
  - Comment kết quả trực tiếp lên PR
- **Artifacts**: Upload screenshots, videos, và test summary

### 2. Unit Tests (`unit-tests.yml`)
- **Trigger**: Push/PR khi có thay đổi trong thư mục `unit/`
- **Chức năng**: Chạy chỉ unit tests
- **Artifacts**: Upload screenshots khi test fail

### 3. Scheduled Tests (`scheduled-tests.yml`)
- **Trigger**: Chạy hàng ngày lúc 2 AM UTC (9 AM Vietnam), hoặc manual trigger
- **Chức năng**: Chạy tất cả tests và tạo báo cáo

## Cách sử dụng

### Chạy tests locally

```bash
cd automation

# Chạy tất cả tests
npm run test:e2e

# Chạy chỉ unit tests
npm run test:unit

# Chạy chỉ home page tests
npm run test:home

# Mở Cypress GUI
npm run test:open
```

### Tự động chạy trên PR

1. Tạo Pull Request trên branch `main` hoặc `develop`
2. GitHub Actions sẽ tự động chạy tất cả Cypress tests
3. Xem kết quả trong tab **Actions** hoặc comment trên PR
4. Download artifacts nếu cần debug

### Manual trigger workflows

1. Vào tab **Actions** trên GitHub
2. Chọn workflow muốn chạy
3. Click **Run workflow**

### Xem kết quả tests

1. Trong tab **Actions**, click vào workflow run
2. Xem logs và download artifacts (screenshots/videos/summary)
3. Check comment trên PR để xem summary nhanh

## Cấu hình

### PR Triggers
Workflow chạy trên các PR events:
- `opened`: Khi tạo PR mới
- `synchronize`: Khi push commit mới lên PR
- `reopened`: Khi reopen PR đã đóng
- `ready_for_review`: Khi chuyển từ draft sang ready

**Không chạy trên draft PR** để tiết kiệm resources.

### Node.js versions
Hiện tại test trên Node.js 18 và 20. Có thể thêm versions khác trong matrix:

```yaml
strategy:
  matrix:
    node-version: [16, 18, 20, 21]
```

### Test scripts
Các script được định nghĩa trong `automation/package.json`:

- `test:e2e`: Chạy tất cả E2E tests
- `test:unit`: Chạy tất cả unit tests
- `test:home`: Chạy chỉ home page tests

### Branches
Workflows chạy trên branches `main` và `develop`. Có thể thêm branches khác:

```yaml
on:
  push:
    branches: [ main, develop, staging ]
  pull_request:
    branches: [ main, develop, staging ]
```

## Features

### ✅ PR Comments
Mỗi PR sẽ có comment tự động với kết quả test:
- Status của tests
- Node.js version được sử dụng
- Link download artifacts

### ✅ Test Summary
File `test-summary.md` được tạo với thông tin chi tiết về:
- Thời gian chạy
- Số lượng screenshots/videos
- Branch và PR info

### ✅ Smart Triggers
- Chỉ chạy unit tests khi có thay đổi trong `unit/` folder
- Không chạy trên draft PR
- Parallel execution trên multiple Node versions

## Troubleshooting

### Tests fail trên CI nhưng pass locally
- Kiểm tra baseUrl trong `cypress.config.js`
- Đảm bảo server được start trước khi chạy tests
- Kiểm tra network timeouts

### PR không có comment
- Kiểm tra workflow permissions trong repository settings
- Đảm bảo PR không phải draft

### Artifacts không upload
- Chỉ upload khi có failure hoặc always
- Kiểm tra retention-days setting

### Performance issues
- Sử dụng Cypress Dashboard để parallel testing
- Tăng timeout cho các tests chậm
- Sử dụng `cypress run --record` để ghi lại results

## Best Practices

1. **Luôn tạo PR** thay vì push trực tiếp lên main/develop
2. **Xem comment trên PR** để biết kết quả tests nhanh
3. **Download artifacts** khi cần debug test failures
4. **Sử dụng draft PR** khi đang development để tránh chạy tests thừa