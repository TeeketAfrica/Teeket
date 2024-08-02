import { createSelector, createSlice } from "@reduxjs/toolkit";

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

  eventData: null,
  eventDataTickets: {
    isLoading: false,
    data: null,
    error: null,
  },
  eventTicketBooking: null,
  ticketStep: 1,
  ticketQuantity: 0,
  isBookedTicket: false,
  isSetDetails: false,
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

    setEventData: (state, action) => {
      state.eventData = action.payload;
    },
    setEventDataTicketsData: (state, action) => {
      state.eventDataTickets.data = action.payload;
      state.eventDataTickets.isLoading = false;
      state.eventDataTickets.error = null;
    },
    setEventDataTicketsLoading: (state) => {
      state.eventDataTickets.isLoading = true;
      state.eventDataTickets.data = null;
      state.eventDataTickets.error = null;
    },
    setEventDataTicketsError: (state, action) => {
      state.eventDataTickets.isLoading = false;
      state.eventDataTickets.data = null;
      state.eventDataTickets.error = action.payload;
    },

    changeEventDataTicketsQuantity: (state, action) => {
      const { id, name, quantity, price } = action.payload;
      if (!state.eventTicketBooking) {
        state.eventTicketBooking = [];
      }
      const existingTicket = state.eventTicketBooking.find(
        (ticket) => ticket.id === id
      );

      if (existingTicket) {
        existingTicket.quantity = quantity;
        existingTicket.price = (quantity * parseFloat(price)).toFixed(2);
      } else {
        state.eventTicketBooking.push({
          id,
          name,
          quantity,
          price: (quantity * parseFloat(price)).toFixed(2),
        });
      }
    },
    changeTicketStep: (state, action) => {
      state.ticketStep = action.payload;
    },
    setTicketQuantity: (state, action) => {
      state.ticketQuantity = action.payload;
    },
    setIsBookedTicket: (state, action) => {
      state.isBookedTicket = action.payload;
    },
    setIsSetDetails: (state, action) => {
      state.isBookedTicket = action.payload;
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
  setEventData,
  setEventDataTicketsData,
  setEventDataTicketsLoading,
  setEventDataTicketsError,
  changeEventDataTicketsQuantity,
  changeTicketStep,
  setTicketQuantity,
  setIsBookedTicket,
  setIsSetDetails,
} = eventSlice.actions;

const TRANSACTION_FEE_RATE = 0.01;

export const selectPriceDetails = createSelector(
  (state) => state.event.eventTicketBooking || [],
  (eventTicketBooking) => {
    const totalPrice = eventTicketBooking.reduce((total, ticket) => {
      return total + parseFloat(ticket.price);
    }, 0);

    const transactionFee = totalPrice * TRANSACTION_FEE_RATE;
    const finalTotal = totalPrice + transactionFee;

    return {
      subTotalPrice: totalPrice.toFixed(2),
      transactionFee: transactionFee.toFixed(2),
      totalPrice: finalTotal.toFixed(2),
    };
  }
);

export const selectEventDetails = (state) => state.event;

export default eventSlice.reducer;
