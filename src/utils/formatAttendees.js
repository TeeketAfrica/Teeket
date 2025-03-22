function getBookingMessage(length) {
    if (length < 10) {
        return "Be among the first 10 people to book, hurry up!";
    }
    
    const thresholds = [10, 20, 100, 200, 1000, 2000, 1000000, 2000000];
    
    for (let i = thresholds.length - 1; i >= 0; i--) {
        if (length > thresholds[i]) {
            return `${formatNumber(thresholds[i])}+ people are going already`;
        }
    }
    
    return "People are booking fast, join now!";
}

function formatNumber(num) {
    if (num >= 1000000) {
        return `${num / 1000000}M`;
    } else if (num >= 1000) {
        return `${num / 1000}k`;
    }
    return num;
}
