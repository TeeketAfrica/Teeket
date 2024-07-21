import { parse, format } from "date-fns";

const maskEmail = (email) => {
  const [username, domain] = email.split("@");
  const maskingLength = Math.min(4, username.length);
  const maskedUsername = `${username.slice(0, maskingLength)}${"*".repeat(
    Math.max(username.length - username.length + 2, 0)
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

const readAsBinary = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Failed to read the image."));

    reader.readAsArrayBuffer(file);
  });
};

const formatDate = (inputDate) => {
  return format(inputDate, "dd MMM',' yyyy");
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

const formatDateAndTime = (isoString, type) => {
  const dateObj = new Date(isoString);

  const day = dateObj.getUTCDate();
  const month = dateObj.getUTCMonth() + 1;
  const year = dateObj.getUTCFullYear();

  const options = { weekday: type };
  const dayOfWeek = new Intl.DateTimeFormat("en-US", options).format(dateObj);

  const monthName = dateObj.toLocaleString("en-US", { month: type });

  const getOrdinalSuffix = (day) => {
    if (day === 1 || day === 21 || day === 31) return "st";
    if (day === 2 || day === 22) return "nd";
    if (day === 3 || day === 23) return "rd";
    return "th";
  };

  let hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")} ${ampm}`;

  const dayNumber = `${day}${getOrdinalSuffix(day)}`;

  return {
    time: formattedTime,
    date: {
      dayNumber: dayNumber,
      day: dayOfWeek,
      month: monthName,
      year: year,
    },
  };
};

export {
  maskEmail,
  isValidImage,
  getImageDimensions,
  formatDate,
  convertTimeFormat,
  calculateMinAndMaxPrices,
  readAsBinary,
  formatDateAndTime,
};
