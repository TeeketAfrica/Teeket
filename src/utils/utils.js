const maskEmail = (email) => {
  const [username, domain] = email.split('@');
  const maskingLength = Math.min(7, username.length);
  const maskedUsername = `${username.slice(0, maskingLength)}${'*'.repeat(
    Math.max(username.length - maskingLength, 0)
  )}`;
  return `${maskedUsername}@${domain}`;
};

const isValidImage = (file) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  return allowedTypes.includes(file.type) && file.size <= maxFileSize;
};

const getImageDimensions = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = () => {
      reject(new Error('Failed to get image dimensions.'));
    };

    img.src = URL.createObjectURL(file);
  });
};

export { maskEmail, isValidImage, getImageDimensions };
