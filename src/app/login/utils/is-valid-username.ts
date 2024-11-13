export const isValidUsername = (username: string): boolean => {
  if (!username) return false;
  return /^[a-zA-Z0-9_-]+$/.test(username);
};
