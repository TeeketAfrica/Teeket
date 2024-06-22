import { createSlice } from "@reduxjs/toolkit";

// Utility function to calculate total ticket quantity
const sumTicketQuantity = (tickets) => {
  return tickets.reduce(
    (accumulator, { ticketQuantity }) =>
      accumulator +
      (isNaN(parseInt(ticketQuantity, 10)) ? 0 : parseInt(ticketQuantity, 10)),
    0
  );
};

const initialState = {
  eventTitle: "",
  eventOrganizer: "",
  eventType: "",
  eventIndustry: "",
  eventTags: "",
  eventStartDate: "",
  eventStartTime: "",
  eventEndDate: "",
  eventEndTime: "",
  eventBannerImage: "",
  eventAbout: "",
  eventHosting: "",
  eventLocation: "",
  eventPlan: "",
  publishLive: "",
  tickets: [],
  totalTicketQuantities: 0,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEventDetails: (state, action) => {
      Object.assign(state, action.payload);
    },

    setEventDetail: (state, action) => {
      const { fieldName, value } = action.payload;
      state[fieldName] = value;
    },

    setTicketDetails: (state, action) => {
      state.tickets.push({
        id: Date.now(),
        ...action.payload,
      });
      state.totalTicketQuantities = sumTicketQuantity(state.tickets);
    },

    updateTicketDetails: (state, action) => {
      const { id, ...updatedFields } = action.payload;
      const ticketIndex = state.tickets.findIndex((ticket) => ticket.id === id);
      if (ticketIndex >= 0) {
        state.tickets[ticketIndex] = {
          ...state.tickets[ticketIndex],
          ...updatedFields,
        };
        state.totalTicketQuantities = sumTicketQuantity(state.tickets);
      }
    },

    deleteTicket: (state, action) => {
      state.tickets = state.tickets.filter(
        (ticket) => ticket.id !== action.payload
      );
      state.totalTicketQuantities = sumTicketQuantity(state.tickets);
    },

    resetEventState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setEventDetails,
  setEventDetail,
  setTicketDetails,
  updateTicketDetails,
  deleteTicket,
  resetEventState,
} = eventSlice.actions;

export const selectEventDetails = (state) => state.event;

export default eventSlice.reducer;
