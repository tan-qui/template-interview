
export const helper = {
  randomUUID,
  getUserId,
  saveUserId
};

function randomUUID(length: number = 15) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uuid = "";
  for (let i = 0; i < length; i++) {
    uuid += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return uuid;
}

// Get stored userId or generate new one
function getUserId() {
  if (typeof window !== 'undefined') {
    const storedUserId = localStorage.getItem('UserId');
    return storedUserId || "";
  }
  return "";
};

// Save userId to localStorage
function saveUserId(userId: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('UserId', userId);
  }
};