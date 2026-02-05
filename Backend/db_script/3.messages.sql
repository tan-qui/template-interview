CREATE TABLE messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    conversationId CHAR(50) NOT NULL,
    sender ENUM('USER', 'ASSISTANT', 'SYSTEM') NOT NULL,
    content TEXT NOT NULL,
    tokenUsage INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE INDEX idx_message_conversation_id
ON messages(conversationId);

CREATE INDEX idx_message_created_at
ON messages(createdAt);