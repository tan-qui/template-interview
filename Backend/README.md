# Backend Interview Template - Chat AI System

Hệ thống backend cho ứng dụng chat AI tích hợp OpenAI, cung cấp các tính năng chat cơ bản với khả năng lưu trữ lịch sử hội thoại và upload file.

## 📋 Tính Năng

### ✨ Tính Năng Chính
- **Chat AI Integration**: Tích hợp OpenAI API để tạo phản hồi thông minh
- **Quản lý Hội thoại**: Tạo, lưu trữ và truy xuất lịch sử chat
- **Upload File**: Hỗ trợ upload và quản lý file đính kèm
- **Authentication**: Hệ thống xác thực với JWT
- **Database Persistence**: Lưu trữ tất cả dữ liệu chat vào MySQL
- **API RESTful**: Cung cấp API endpoints đầy đủ
- **Multi-language**: Hỗ trợ đa ngôn ngữ (Việt, Anh)
- **Logging**: Hệ thống log chi tiết với Winston

### 🎯 Các Features Cụ Thể
- **Chat Input**: Nhập văn bản đa dòng
- **Generate Response**: Tạo phản hồi AI từ OpenAI
- **File Upload**: Upload file qua API
- **Chat History**: Lưu trữ và hiển thị lịch sử hội thoại
- **Token Tracking**: Theo dõi token usage của OpenAI

## 🏗️ Cấu Trúc Project

```
Backend/
├── 📁 db_script/               # Scripts tạo database
│   ├── 0.create_schema.sql    # Tạo schema
│   ├── 1.user.sql             # Bảng users
│   ├── 2.conversations.sql    # Bảng conversations
│   ├── 3.messages.sql         # Bảng messages
│   └── 4.file_uploads.sql     # Bảng file_uploads
│
├── 📁 src/                     # Source code chính
│   ├── 📁 Constants/           # Hằng số và enums
│   │   └── Constant.ts        # Định nghĩa status codes
│   │
│   ├── 📁 Controllers/         # Controllers xử lý request
│   │   └── 📁 Public/
│   │       └── ChatController.ts  # Chat controller
│   │
│   ├── 📁 Database/            # Kết nối database
│   │   └── Mysql.ts           # MySQL connection
│   │
│   ├── 📁 Dtos/               # Data Transfer Objects
│   │   └── 📁 Common/
│   │       └── ItemDto.ts     # DTO chung
│   │
│   ├── 📁 Helper/             # Utilities và helpers
│   │   └── Utils.ts           # Các hàm tiện ích
│   │
│   ├── 📁 Langs/              # Đa ngôn ngữ
│   │   ├── en.json           # Ngôn ngữ Anh
│   │   ├── vi.json           # Ngôn ngữ Việt
│   │   └── i18n.ts           # Cấu hình i18n
│   │
│   ├── 📁 Middleware/          # Middleware
│   │   └── Auth.ts            # Authentication middleware
│   │
│   ├── 📁 Requests/           # Request validation schemas
│   │   └── 📁 Chat/
│   │       ├── ReqChat.ts     # Chat request validation
│   │       ├── ReqConversation.ts  # Conversation validation
│   │       └── ReqMessage.ts   # Message validation
│   │
│   ├── 📁 Routes/             # API routes
│   │   └── 📁 Public/
│   │       └── ChatRoutes.ts  # Chat routes
│   │
│   └── 📁 Services/           # Business logic services
│       ├── ChatService.ts     # Chat business logic
│       └── OpenAIService.ts   # OpenAI integration
│
├── 📁 uploads/                # Thư mục upload files
│   └── 📁 temp/              # Temporary uploads
│
├── 📄 server.ts              # Entry point chính
├── 📄 package.json           # Dependencies và scripts
├── 📄 tsconfig.json          # TypeScript configuration
├── 📄 ecosystem.config.js    # PM2 configuration
└── 📄 .env.dev              # Environment variables
```

## 🛠️ Công Nghệ Sử Dụng

### Backend Framework
- **Node.js**: Runtime environment
- **TypeScript**: Programming language
- **Express.js**: Web framework
- **ts-node**: TypeScript execution
- **Nodemon**: Development server

### Database & Authentication
- **MySQL2**: Database driver
- **JWT**: Authentication tokens
- **Bcrypt**: Password hashing

### External Services
- **OpenAI**: AI chat integration
- **Multer**: File upload handling
- **Axios**: HTTP client

### Utilities & Tools
- **Winston**: Logging system
- **Moment.js**: Date manipulation  
- **i18n**: Internationalization
- **CORS**: Cross-origin requests
- **Crypto**: Cryptographic functions

## 🚀 Hướng Dẫn Cài Đặt

### Yêu cầu hệ thống
- Node.js 22.12.0
- npm, yarn, hoặc pnpm (khuyên dùng yarn)

### 1. Cài Đặt Dependencies
```bash
# Clone project và di chuyển vào thư mục Backend
cd Backend

# Cài đặt packages
yarn install
# hoặc
npm install
```

### 2. Thiết Lập Database
```bash
# Tạo MySQL database từ file
db_script/0.create_schema.sql

# Chạy các script SQL theo thứ tự
db_script/1.user.sql
db_script/2.conversations.sql
db_script/3.messages.sql
db_script/4.file_uploads.sql
```

### 3. Cấu Hình Environment
Tạo file `.env.dev` và cấu hình các biến:

```dotenv
# JWT Configuration
JWT_PRIVATE_KEY=your_jwt_secret_key
SALT=10

# Server Configuration  
PORT=8082

# MySQL Database
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_DATABASE=template-interview
MYSQL_PASSWORD=your_mysql_password

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key
```

### 4. Chạy Ứng Dụng
```bash
# Development mode
yarn start

# hoặc
npm start

# hoặc 
Debug with VSCode

# Ứng dụng sẽ chạy tại: http://localhost:8082
```

## 📡 API Endpoints

### Chat APIs

#### 1. Gửi Prompt và Nhận Phản Hồi AI
```http
POST /api/prompt
Content-Type: application/json

{
  "message": "Hello, how are you?",
  "conversationId": "optional-conversation-id",
  "userId": "user-id"
}
```

**Response:**
```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "response": "AI generated response",
    "conversationId": "conversation-uuid",
  }
}
```

#### 2. Lấy Tất Cả Hội Thoại
```http
POST /api/conversation-all
Content-Type: application/json

{
  "userId": "user-id"
}
```

**Response:**
```json
{
  "status": 200,
  "message": "Success", 
  "data": [
    {
      "id": "conversation-id",
      "title": "Conversation Title",
      "userId": "user-id",
      "createdAt": "2026-02-06T10:00:00Z",
      "updatedAt": "2026-02-06T10:30:00Z"
    }
  ]
}
```

#### 3. Lấy Tất Cả Message Trong Hội Thoại
```http
POST /api/message-all
Content-Type: application/json

{
  "conversationId": "conversation-id"
}
```

**Response:**
```json
{
  "status": 200,
  "message": "Success",
  "data": [
    {
      "id": 1,
      "conversationId": "conversation-id",
      "sender": "USER",
      "content": "Hello",
      "tokenUsage": 5,
      "createdAt": "2026-02-06T10:00:00Z"
    },
    {
      "id": 2,
      "conversationId": "conversation-id", 
      "sender": "ASSISTANT",
      "content": "Hi there! How can I help you?",
      "tokenUsage": 12,
      "createdAt": "2026-02-06T10:00:05Z"
    }
  ]
}
```

## 🗄️ Database Schema

### Bảng Users
```sql
CREATE TABLE users (
    id CHAR(50) PRIMARY KEY,
    email VARCHAR(255) NULL,
    name VARCHAR(255),
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    passwordHash VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Bảng Conversations  
```sql
CREATE TABLE conversations (
    id CHAR(50) PRIMARY KEY,
    userId CHAR(50) NULL,
    title VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Bảng Messages
```sql
CREATE TABLE messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    conversationId CHAR(50) NOT NULL,
    sender ENUM('USER', 'ASSISTANT', 'SYSTEM') NOT NULL,
    content TEXT NOT NULL,
    tokenUsage INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Bảng File Uploads
```sql
CREATE TABLE file_uploads (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    messageId BIGINT,
    fileName VARCHAR(255),
    filePath VARCHAR(500),
    fileType VARCHAR(100),
    fileSize BIGINT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## ⚙️ Cấu Hình Môi Trường

### Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Môi trường chạy | dev |
| `PORT` | Port server | 8082 |
| `JWT_PRIVATE_KEY` | Secret key cho JWT | - |
| `SALT` | Salt rounds cho bcrypt | 10 |
| `MYSQL_HOST` | MySQL host | localhost |
| `MYSQL_USER` | MySQL username | root |
| `MYSQL_DATABASE` | Tên database | template-interview |
| `MYSQL_PASSWORD` | MySQL password | - |
| `OPENAI_API_KEY` | OpenAI API key | - |

## 📁 Chi Tiết Các Thành Phần

### Controllers
- **ChatController.ts**: Xử lý các request liên quan đến chat, gọi services tương ứng

### Services  
- **ChatService.ts**: Business logic cho chat, quản lý conversations và messages
- **OpenAIService.ts**: Tích hợp OpenAI API, xử lý prompts và responses

### Routes
- **ChatRoutes.ts**: Định nghĩa các endpoints cho chat API

### Database
- **Mysql.ts**: Kết nối và quản lý MySQL database connection

### Middleware
- **Auth.ts**: Xác thực JWT tokens và authorization

## 🔧 Development & Deployment

### Scripts Npm
```bash
# Chạy development server với hot-reload
yarn start

# Build production (cần thêm build script)
yarn build

# Run tests (chưa implement)
yarn test
```

### PM2 Deployment
Sử dụng [ecosystem.config.js](ecosystem.config.js) cho PM2:
```bash
pm2 start ecosystem.config.js
```

## 🐛 Troubleshooting

### Lỗi Database Connection
- Kiểm tra MySQL service đang chạy
- Xác nhận thông tin kết nối trong `.env.dev`
- Kiểm tra firewall và port 3306

### Lỗi OpenAI API
- Xác nhận OPENAI_API_KEY hợp lệ
- Kiểm tra quota và billing của OpenAI account
- Xem logs để biết lỗi chi tiết

### Upload File Issues
- Kiểm tra quyền write cho thư mục `uploads/`
- Xác nhận file size không vượt quá 10MB limit
- Kiểm tra multer configuration

## 📝 Ghi Chú

- Tất cả lịch sử chat được lưu trữ trong database
- Ứng dụng hỗ trợ CORS với origin "*" (nên restrict trong production)
- Token usage của OpenAI được track cho mỗi message
- File uploads được lưu tạm trong thư mục `uploads/temp/`
- Logging được cấu hình với Winston và daily rotation

## 👥 Tác Giả

- **Author**: tan-qui
- **Version**: 1.0.0
- **License**: ISC


