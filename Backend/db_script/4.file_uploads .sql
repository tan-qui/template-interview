CREATE TABLE file_uploads (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    messageId BIGINT,
    fileName VARCHAR(255),
    filePath VARCHAR(500),
    fileType VARCHAR(100),
    fileSize BIGINT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
