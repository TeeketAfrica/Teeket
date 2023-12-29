const maskEmail = (email) => {
  const [username, domain] = email.split('@');
  const maskingLength = Math.min(7, username.length);
  const maskedUsername = `${username.slice(0, maskingLength)}${'*'.repeat(
    Math.max(username.length - maskingLength, 0)
  )}`;
  return `${maskedUsername}@${domain}`;
};

export { maskEmail };
