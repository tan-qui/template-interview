CREATE TABLE conversations (
    id CHAR(50) PRIMARY KEY,
    userId CHAR(50) NULL,
    title VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_conversation_user_id
ON conversations(userId);