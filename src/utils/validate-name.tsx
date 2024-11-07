export const validateName = (name: string): [boolean, string] => {
  let error = "";

  if (name.trim().length === 0) {
    error = "Name cannot be empty";
    return [false, error];
  }
  if (name.length > 50) {
    error = "Name is too long (max 50 characters)";
    return [false, error];
  }
  if (/[<>:"/\\|?*]/.test(name)) {
    error = "Name contains invalid characters";
    return [false, error];
  }
  return [true, "This name is ok"];
};
