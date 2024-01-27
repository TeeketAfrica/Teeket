import { createSlice } from '@reduxjs/toolkit';

const sumTicketQuantity = (state) => {
  const totalQuantity = state.tickets.reduce(
    (accumulator, { ticketQuantity }) =>
      accumulator +
      (isNaN(parseInt(ticketQuantity, 10)) ? 0 : parseInt(ticketQuantity, 10)),
    0
  );

  state.totalTicketQuantities = totalQuantity;
};

const eventSlice = createSlice({
  name: 'event',
  initialState: {
    eventTitle: '',
    eventOrganizer: '',
    eventType: '',
    eventIndustry: '',
    eventTags: '',
    eventStartDate: '',
    eventStartTime: '',
    eventEndDate: '',
    eventEndTime: '',
    eventBannerImage: '',
    eventAbout: '',
    eventHosting: '',
    eventLocation: '',
    eventPlan: '',
    publishLive: '',
    tickets: [],
    totalTicketQuantities: 0,
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
        eventLocation,
        eventPlan,
        totalTicketQuantities,
        publishLive,
      } = action.payload;
      return {
        ...state,
        eventTitle: eventTitle ?? '',
        eventOrganizer: eventOrganizer ?? '',
        eventType: eventType ?? '',
        eventIndustry: eventIndustry ?? '',
        eventTags: eventTags ?? '',
        eventStartDate: eventStartDate ?? '',
        eventStartTime: eventStartTime ?? '',
        eventEndDate: eventEndDate ?? '',
        eventEndTime: eventEndTime ?? '',
        eventBannerImage: eventBannerImage ?? '',
        eventAbout: eventAbout ?? '',
        eventHosting: eventHosting ?? '',
        eventLocation: eventLocation ?? '',
        eventPlan: eventPlan ?? '',
        totalTicketQuantities: totalTicketQuantities ?? 0,
        publishLive: publishLive ?? '',
      };
    },

    setEventDetail: (state, action) => {
      const { fieldName, value } = action.payload;
      state[fieldName] = value;
    },

    setTicketDetails: (state, action) => {
      state.tickets.push({
        id: state.tickets.length + 1 * Date.now(),
        ...action.payload,
      });

      sumTicketQuantity(state);
    },

    updateTicketDetails: (state, action) => {
      const { id, ...updatedFields } = action.payload;

      state.tickets = state.tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, ...updatedFields } : ticket
      );

      sumTicketQuantity(state);
    },

    deleteTicket: (state, action) => {
      const ticketIdToDelete = action.payload;

      state.tickets = state.tickets.filter(
        (ticket) => ticket.id !== ticketIdToDelete
      );

      sumTicketQuantity(state);
    },
  },
});

export const {
  setEventDetails,
  setEventDetail,
  setTicketDetails,
  updateTicketDetails,
  deleteTicket,
} = eventSlice.actions;
export const selectEventDetails = (state) => state.event;
export default eventSlice.reducer;
