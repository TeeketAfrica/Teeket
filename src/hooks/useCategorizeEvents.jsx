import { useState, useEffect } from "react";

const useCategorizeEvents = (allEvents) => {
  const [eventLists, setEventLists] = useState({
    trendingFree: [],
    trendingPaid: [],
    notTrendingFree: [],
    notTrendingPaid: [],
  });

  useEffect(() => {
    const trendingFree = [];
    const trendingPaid = [];
    const notTrendingFree = [];
    const notTrendingPaid = [];

    allEvents.forEach((event) => {
      const isFree = Number(event.lowest_ticket_price) === 0;
      const isTrending = event.status.toLowerCase().includes("trending");

      if (isTrending) {
        if (isFree) {
          trendingFree.push(event);
        } else {
          trendingPaid.push(event);
        }
      } else {
        if (isFree) {
          notTrendingFree.push(event);
        } else {
          notTrendingPaid.push(event);
        }
      }
    });

    setEventLists({
      trendingFree,
      trendingPaid,
      notTrendingFree,
      notTrendingPaid,
    });
  }, [allEvents]);

  return eventLists;
};

export default useCategorizeEvents;
