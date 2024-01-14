import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: {
    eventTitle: "",
    eventOrganizer: "",
    eventType: "",
    eventIndustry: "",
    eventTags: [],
    eventStartDate: "",
    eventStartTime: "",
    eventEndDate: "",
    eventEndTime: "",
    eventBannerImage: "",
    eventAbout: "",
    eventHosting: "",
    eventEstimatedSoldTicket: "",
    eventPlan: "",
    eventTicketName: "",
    eventTicketPrice: "",
    eventNumberOfTicketSold: "",
  },
  reducers: {
    setEventDetails: (state, action) => {
      const {
        eventTitle,
        eventOrganizer,
        eventType,
        eventIndustry,
        eventTags,
        eventStartDate,
        eventStartTime,
        eventEndDate,
        eventEndTime,
        eventBannerImage,
        eventAbout,
        eventHosting,
        eventEstimatedSoldTicket,
        eventPlan,
        eventTicketName,
        eventTicketPrice,
        eventNumberOfTicketSold,
      } = action.payload;
      state.eventTitle = eventTitle || "";
      state.eventOrganizer = eventOrganizer || "";
      state.eventType = eventType || "";
      state.eventIndustry = eventIndustry || "";
      state.eventTags = eventTags || [];
      state.eventStartDate = eventStartDate || "";
      state.eventStartTime = eventStartTime || "";
      state.eventEndDate = eventEndDate || "";
      state.eventEndTime = eventEndTime || "";
      state.eventBannerImage = eventBannerImage || "";
      state.eventAbout = eventAbout || "";
      state.eventHosting = eventHosting || "";
      state.eventEstimatedSoldTicket = eventEstimatedSoldTicket || "";
      state.eventPlan = eventPlan || "";
      state.eventTicketName = eventTicketName || "";
      state.eventTicketPrice = eventTicketPrice || "";
      state.eventNumberOfTicketSold = eventNumberOfTicketSold || "";
    },
  },
});

export const { setEventDetails } = eventSlice.actions;
export const selectEventDetails = (state) => state.event;
export default eventSlice.reducer;
