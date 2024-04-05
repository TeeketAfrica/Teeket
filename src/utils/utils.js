import { parse, format } from "date-fns";

const maskEmail = (email) => {
  const [username, domain] = email.split("@");
  const maskingLength = Math.min(7, username.length);
  const maskedUsername = `${username.slice(0, maskingLength)}${"*".repeat(
    Math.max(username.length - maskingLength, 0)
  )}`;
  return `${maskedUsername}@${domain}`;
};

const isValidImage = (file) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
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
      reject(new Error("Failed to get image dimensions."));
    };

    img.src = URL.createObjectURL(file);
  });
};

const formatDate = (inputDate) => {
  return format(inputDate, "do MMM',' yyyy");
};

const convertTimeFormat = (timeString) =>
  format(parse(timeString, "HH:mm", new Date()), "hh:mmaa");

const calculateMinAndMaxPrices = (tickets) => {
  return tickets.reduce(
    (result, ticket) => {
      const price = parseInt(ticket.ticketPrice, 10);

      // Update min and max prices
      result.minPrice = Math.min(result.minPrice, price);
      result.maxPrice = Math.max(result.maxPrice, price);

      return result;
    },
    {
      minPrice: Infinity,
      maxPrice: -Infinity,
    }
  );
};

export {
  maskEmail,
  isValidImage,
  getImageDimensions,
  formatDate,
  convertTimeFormat,
  calculateMinAndMaxPrices,
};
