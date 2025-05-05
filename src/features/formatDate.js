export function formatDate(isoString) {
    const date = new Date(isoString);
  
    // Example: March 19, 2025, 9:05 PM
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }