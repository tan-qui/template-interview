# Chat Application Frontend

Ứng dụng chat hiện đại được xây dựng bằng Next.js 14 với TypeScript, hỗ trợ đa ngôn ngữ và giao diện người dùng tối ưu.

## 📋 Mô tả dự án

Đây là một ứng dụng chat frontend được phát triển bằng Next.js với các tính năng:
- 💬 Chat realtime với bot/AI
- 🌐 Hỗ trợ đa ngôn ngữ (Tiếng Việt, Tiếng Anh)
- 🎨 Giao diện hiện đại với Tailwind CSS
- 📱 Responsive design
- 🗂️ Quản lý lịch sử chat
- 🎯 TypeScript cho type safety
- 🔧 Component system có thể tái sử dụng

## 🛠️ Công nghệ sử dụng

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom UI components + Radix UI
- **State Management:** Zustand
- **Internationalization:** next-intl
- **Linting:** ESLint
- **Package Manager:** npm/yarn/pnpm

## 📁 Cấu trúc thư mục

```
├── src/
│   ├── app/                    # App Router (Next.js 14)
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── [locale]/           # Localized routes
│   │       ├── layout.tsx      # Locale layout
│   │       └── (main)/         # Main app group
│   │           ├── layout.tsx  # Main layout with sidebar
│   │           ├── chat/       # Chat pages
│   │           │   ├── page.tsx        # Chat home
│   │           │   └── [id]/page.tsx   # Specific chat
│   │           └── history/    # Chat history
│   │
│   ├── components/             # React components
│   │   ├── common/             # Shared components
│   │   │   ├── app-header.tsx  # Header component
│   │   │   ├── app-sidebar.tsx # Sidebar navigation
│   │   │   ├── app-logo.tsx    # Logo component
│   │   │   └── ...
│   │   └── ui/                 # Base UI components
│   │       ├── button.tsx      # Button component
│   │       ├── input.tsx       # Input component
│   │       ├── dialog.tsx      # Modal component
│   │       └── ...
│   │
│   ├── features/               # Feature modules
│   │   └── chat/               # Chat feature
│   │       ├── index.tsx       # Main chat component
│   │       ├── action.ts       # Chat actions
│   │       ├── service.ts      # Chat API service
│   │       ├── type.ts         # TypeScript types
│   │       └── components/     # Chat-specific components
│   │           ├── message.tsx # Message component
│   │           ├── intro.tsx   # Chat intro
│   │           └── bot-loading.tsx
│   │
│   ├── services/               # API services
│   │   ├── base.service.ts     # Base service class
│   │   ├── api.fetcher.ts      # API fetcher utility
│   │   └── type.service.ts     # Type definitions
│   │
│   ├── store/                  # State management
│   │   ├── chat-store.ts       # Chat state
│   │   ├── loading-store.ts    # Loading state
│   │   └── confirm-store.ts    # Confirmation dialogs
│   │
│   ├── hooks/                  # Custom React hooks
│   │   └── use-mobile.ts       # Mobile detection hook
│   │
│   ├── i18n/                   # Internationalization
│   │   ├── navigation.ts       # i18n navigation
│   │   ├── request.ts          # Server-side i18n
│   │   └── routing.ts          # Route configuration
│   │
│   ├── lib/                    # Utility libraries
│   │   └── utils.ts            # Common utilities
│   │
│   ├── constants/              # Constants
│   │   ├── enums.ts            # Enum definitions
│   │   └── languages.ts        # Language configurations
│   │
│   ├── helper/                 # Helper functions
│   │   └── index.ts
│   │
│   └── middleware.ts           # Next.js middleware
│
├── messages/                   # i18n message files
│   ├── en.json                 # English translations
│   └── vi.json                 # Vietnamese translations
│
├── public/                     # Static assets
│   └── svg/                    # SVG icons
│
├── components.json             # shadcn/ui configuration
├── tailwind.config.ts          # Tailwind CSS config
├── tsconfig.json              # TypeScript config
├── next.config.ts             # Next.js configuration
└── package.json               # Dependencies
```

## 🚀 Hướng dẫn cài đặt

### Yêu cầu hệ thống
- Node.js 22.12.0
- npm, yarn, hoặc pnpm (khuyên dùng yarn)

### Cài đặt dependencies

```bash
# Clone project và di chuyển vào thư mục Frontend
cd Frontend

# Sử dụng npm
npm install

# Hoặc sử dụng yarn
yarn install

# Hoặc sử dụng pnpm
pnpm install
```

### Chạy môi trường development

```bash
# Sử dụng npm
npm run dev

# Hoặc sử dụng yarn
yarn dev

# Hoặc sử dụng pnpm
pnpm dev
```

Mở [http://localhost:3008](http://localhost:3008) để xem ứng dụng.

### Build production

```bash
# Build ứng dụng
npm run build

# Hoặc sử dụng yarn
yarn build

# Chạy production build
npm run start
```

## 📖 Hướng dẫn sử dụng

### 1. Điều hướng cơ bản
- **Trang chủ:** Hiển thị giao diện chính của ứng dụng
- **Chat:** Trang chat chính với bot/AI
- **History:** Xem lại lịch sử các cuộc hội thoại

### 2. Tính năng đa ngôn ngữ
- Ứng dụng hỗ trợ Tiếng Việt và Tiếng Anh
- Ngôn ngữ được xác định qua URL: `/vi` hoặc `/en`
- Tự động chuyển hướng dựa trên locale của browser

### 3. Chat
- Nhắn tin với AI/bot
- Xem lịch sử chat
- Tạo cuộc hội thoại mới
- Responsive trên mọi thiết bị

### 4. Quản lý state
- **Chat Store:** Quản lý trạng thái chat và messages
- **Loading Store:** Quản lý trạng thái loading

## 🔧 Cấu hình

### Environment Variables
Tạo file `.env.local` và cấu hình các biến môi trường cần thiết:

```env
# API Configuration
BACKEND_API_URL=http://localhost:8082
```

### Tailwind CSS
Cấu hình trong [tailwind.config.ts](tailwind.config.ts) với:
- Custom colors và themes
- Responsive breakpoints
- Animation configurations

### TypeScript
Cấu hình trong [tsconfig.json](tsconfig.json) với strict mode và path mapping.

## 🧩 Components

### UI Components
Các component cơ bản trong `src/components/ui/`:
- `Button`, `Input`, `Dialog`, `Select`
- `Sheet`, `Popover`, `Tooltip`
- `Avatar`, `Badge`, `Card`

### Common Components
Các component dùng chung trong `src/components/common/`:
- `AppHeader`: Header của ứng dụng
- `AppSidebar`: Sidebar navigation
- `AppLogo`: Logo component

### Feature Components
Component đặc thù cho từng tính năng trong `src/features/`.

## 📝 Scripts có sẵn

```json
{
  "dev": "Chạy development server",
  "build": "Build production",
  "start": "Chạy production server",
  "lint": "Kiểm tra code với ESLint",
  "type-check": "Kiểm tra TypeScript types"
}
```

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🆘 Hỗ trợ

Nếu bạn gặp vấn đề hoặc có câu hỏi, vui lòng:
1. Kiểm tra [Issues](../../issues) đã tồn tại
2. Tạo issue mới với mô tả chi tiết
3. Liên hệ team phát triển

## 👥 Tác Giả

- **Author**: tan-qui
- **Version**: 1.0.0
- **License**: ISC

---

**Happy Coding! 🎉**
