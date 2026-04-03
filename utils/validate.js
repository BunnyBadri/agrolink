export function validateRegister(data) {
  if (!data.name || !data.email || !data.password || !data.role) {
    throw new Error("All fields required");
  }

  if (!data.email.includes("@")) {
    throw new Error("Invalid email");
  }

  if (data.password.length < 4) {
    throw new Error("Password too short");
  }
}

export function validateCrop(data) {
  if (!data.name || !data.quantity || !data.price || !data.location) {
    throw new Error("All crop fields required");
  }

  if (isNaN(data.quantity) || isNaN(data.price)) {
    throw new Error("Invalid numbers");
  }
}