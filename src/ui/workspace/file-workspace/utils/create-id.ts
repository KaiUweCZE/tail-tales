export const createId = () => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const firstChar = letters[Math.floor(Math.random() * letters.length)];
  const timestamp = Date.now().toString(36);
  const timeComponent = timestamp.slice(-2);

  let randomChars = "";

  for (let i = 0; i < 4; i++) {
    randomChars += chars[Math.floor(Math.random() * chars.length)];
  }

  return firstChar + timeComponent + randomChars;
};

export const testUniqueness = () => {
  const ids = new Set();
  for (let i = 0; i < 1000; i++) {
    const id = createId();

    if (!/^[a-zA-Z]/.test(id)) {
      console.error("Invalid ID generated:", id);
    }
    ids.add(createId());
  }
  return ids.size;
};
