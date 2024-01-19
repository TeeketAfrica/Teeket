import { createSlice } from '@reduxjs/toolkit';

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
      } = action.payload;

      state.eventTitle = eventTitle ?? '';
      state.eventOrganizer = eventOrganizer ?? '';
      state.eventType = eventType ?? '';
      state.eventIndustry = eventIndustry ?? '';
      state.eventTags = eventTags ?? '';
      state.eventStartDate = eventStartDate ?? '';
      state.eventStartTime = eventStartTime ?? '';
      state.eventEndDate = eventEndDate ?? '';
      state.eventEndTime = eventEndTime ?? '';
      state.eventBannerImage = eventBannerImage ?? '';
      state.eventAbout = eventAbout ?? '';
      state.eventHosting = eventHosting ?? '';
      state.eventLocation = eventLocation ?? '';
      state.eventPlan = eventPlan ?? '';
      state.totalTicketQuantities = totalTicketQuantities ?? 0;
    },

    setTicketDetails: (state, action) => {
      state.tickets.push({
        id: state.tickets.length + 1 * new Date(),
        ...action.payload,
      });
    },

    updateTicketDetails: (state, id, data) => {
      const existingTicketIndex = state.tickets.findIndex(
        (ticket) => ticket.id === id
      );

      if (existingTicketIndex !== -1) {
        state.tickets[existingTicketIndex] = {
          ...state.tickets[existingTicketIndex],
          ...data,
        };
      }
    },
  },
});

export const { setEventDetails, setTicketDetails, updateTicketDetails } =
  eventSlice.actions;
export const selectEventDetails = (state) => state.event;
export default eventSlice.reducer;
